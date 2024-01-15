import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CharityService } from '../charity.service.js'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { createCharitySchema } from '../validators/createCharity.schema.js'

export async function createCharity(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body } = req

  const charityService = new CharityService()
  const cacheService = new CacheService()

  try {
    // Validate the request body using the validation schema.
    const validation = await createCharitySchema.safeParseAsync(body)

    // If validation is unsuccessful return an error.
    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // Create a charity with validated data.
    const createdCharity = await charityService.createCharity(validation.data)

    // Cache the created charity for one day.
    await cacheService.setForOneDay(createdCharity.id, createdCharity)

    // Return the created charity and success message.
    res.status(StatusCodes.CREATED).json({
      success: true,
      status: ReasonPhrases.CREATED,
      message: 'Successfully created charity.',
      data: createdCharity,
    })
  } catch (error) {
    next(error)
  }
}
