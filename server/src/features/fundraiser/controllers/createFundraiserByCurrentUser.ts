import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import createUserFundraiserSchema from '../validators/createUserFundraiser.schema.js'
import { createFundraiser } from '../fundraiser.service.js'

// This handler creates a fundraiser with the current user in session.

export async function createFundraiserByCurrentUser(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { body, session } = req
  const { user } = session

  const cacheService = new CacheService()

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
    const validation = await createUserFundraiserSchema.safeParseAsync(body)

    // If validation is unsuccessful return an error.
    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // Create a fundraiser with validated data.
    const createdFundraiser = await createFundraiser(validation.data)

    // Cache the created fundraiser for one day.
    await cacheService.setForOneDay(createdFundraiser.id, createdFundraiser)

    // Return the created fundraiser and success message.
    return res.status(StatusCodes.CREATED).json({
      success: true,
      status: ReasonPhrases.CREATED,
      message: 'Successfully created fundraiser.',
      data: createdFundraiser,
    })
  } catch (error) {
    next(error)
  }
}
