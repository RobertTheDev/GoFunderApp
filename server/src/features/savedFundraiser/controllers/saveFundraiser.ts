import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { SavedFundraiserService } from '../savedFundraiser.service.js'
import { createSavedFundraiserSchema } from '../savedFundraiser.validators.js'

// This handler searches for a saved fundraiser and either
// creates or deletes one by user and fundraiser id.

export async function saveFundraiser(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  // Get fundraiser id from request params and user from session.
  const { params, session } = req
  const { fundraiserId: id } = params
  const { user } = session

  // Use the saved fundraiser service to get handlers.
  const savedFundraiserService = new SavedFundraiserService()

  try {
    // If no user is in session return an error.
    if (user == null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        status: ReasonPhrases.BAD_REQUEST,
        message: 'You must be signed in to perform this action.',
        data: null,
      })
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
    const findSavedFundraiser =
      await savedFundraiserService.findSavedFundraiser({ fundraiserId, userId })

    // If saved fundraiser does not exist then create it.
    if (findSavedFundraiser === null) {
      const followedCharity =
        await savedFundraiserService.createSavedFundraiser({
          fundraiserId,
          userId,
        })

      // Return the saved fundraiser and return success message.
      return res.status(StatusCodes.CREATED).json({
        success: true,
        status: ReasonPhrases.CREATED,
        message: 'Successfully saved fundraiser.',
        data: followedCharity,
      })
    }

    // If there is a saved fundraiser then delete it.
    await savedFundraiserService.deleteSavedFundraiser({
      id: findSavedFundraiser.id,
    })

    // Return success message.
    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully unsaved fundraiser.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
