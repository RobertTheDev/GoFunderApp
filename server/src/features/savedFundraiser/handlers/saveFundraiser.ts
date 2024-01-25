import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { createSavedFundraiserSchema } from '../validators/createSavedFundraiser.schema.js'
import {
  createSavedFundraiser,
  deleteSavedFundraiser,
  findSavedFundraiser,
} from '../services/savedFundraiser.service.js'
import { deleteCachedFundraisersSavedByUserId } from '../services/savedFundraiserCache.service.js'

// This handler searches for a saved fundraiser and either
// creates or deletes one by user and fundraiser id.

export async function saveFundraiserHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  // Get fundraiser id from request params and user from session.
  const { params, session } = req
  const { fundraiserId: id } = params
  const { user } = session

  try {
    // If no user is found return an error message.
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    // Validate the request body using the validation schema.
    const validation = await createSavedFundraiserSchema.safeParseAsync({
      userId: user.id,
      fundraiserId: id,
    })

    // If validation is unsuccessful return an error.
    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // Get fundraiser and user ID from validated data.
    const { fundraiserId, userId } = validation.data

    // Find a saved fundraiser with validated data.
    const savedFundraiser = await findSavedFundraiser({ fundraiserId, userId })

    // If saved fundraiser does not exist then create it.
    if (savedFundraiser === null) {
      const followedCharity = await createSavedFundraiser({
        fundraiserId,
        userId,
      })

      await deleteCachedFundraisersSavedByUserId(user.id)

      // Return the saved fundraiser and return success message.
      res.status(StatusCodes.CREATED).json({
        success: true,
        status: ReasonPhrases.CREATED,
        message: 'Successfully saved fundraiser.',
        data: followedCharity,
      })

      return
    }

    // If there is a saved fundraiser then delete it.
    await deleteSavedFundraiser({
      id: savedFundraiser.id,
    })

    await deleteCachedFundraisersSavedByUserId(user.id)

    // Return success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully unsaved fundraiser.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
