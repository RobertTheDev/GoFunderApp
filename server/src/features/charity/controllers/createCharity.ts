import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CharityService } from '../charity.service.js'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { createCharitySchema } from '../validators/createCharity.schema.js'
import { CharityOwnerService } from '../../charityOwner/charityOwner.service.js'

// This handler creates a charity and charity owner with the current user in session.

export async function createCharity(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { body, session } = req
  const { user } = session

  const charityService = new CharityService()
  const charityOwnerService = new CharityOwnerService()
  const cacheService = new CacheService()

  try {
    // If no user is in session return an error.
    if (user == null || user === undefined) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        status: ReasonPhrases.BAD_REQUEST,
        message: 'You must be signed in to perform this action.',
        data: null,
      })
    }

    // Validate the request body using the validation schema.
    const validation = await createCharitySchema.safeParseAsync(body)

    // If validation is unsuccessful return an error.
    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // Create a charity with validated data.
    const createdCharity = await charityService.createCharity(validation.data)

    // Create a charity owner with the current user and created charity.
    await charityOwnerService.createCharityOwner({
      charityId: createdCharity.id,
      userId: user.id,
    })

    // Cache the created charity for one day.
    await cacheService.setForOneDay(createdCharity.id, createdCharity)

    // Return the created charity and success message.
    return res.status(StatusCodes.CREATED).json({
      success: true,
      status: ReasonPhrases.CREATED,
      message: 'Successfully created charity.',
      data: createdCharity,
    })
  } catch (error) {
    next(error)
  }
}
