import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { createCharitySchema } from '../validators/createCharity.schema.js'
import { createCharityOwner } from '../../charityOwner/services/charityOwner.service.js'
import { createCharity } from '../services/charity.service.js'
import { setCachedCharityBySlug } from '../services/charityCache.service.js'

// This handler creates a charity and charity owner with the current user in session.

export async function createCharityHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { body, session } = req
  const { user } = session

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
    const createdCharity = await createCharity(validation.data)

    // Create a charity owner with the current user and created charity.
    await createCharityOwner({
      charityId: createdCharity.id,
      userId: user.id,
    })

    // Cache the created charity for one day.
    await setCachedCharityBySlug(createdCharity.slug, createdCharity)

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
