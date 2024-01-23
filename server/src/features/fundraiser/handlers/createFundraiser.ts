import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { createFundraiser } from '../services/fundraiser.service.js'
import { setCachedFundraiserBySlug } from '../services/fundraiserCache.service.js'
import createFundraiserSchema from '../validators/createFundraiser.schema.js'
import { createFundraiserOwner } from '../../fundraiserOwner/services/fundraiserOwner.service.js'

// This handler creates a fundraiser with a charity id.

export async function createFundraiserHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body, session } = req
  const { user } = session

  try {
    // If no user is in session return an error.
    if (user == null) {
      throw new Error('You must be signed in to perform this action.')
    }

    // Validate the request body using the validation schema.
    const validation = await createFundraiserSchema.safeParseAsync(body)

    // If validation is unsuccessful return an error.
    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // Create a fundraiser with validated data.
    const createdFundraiser = await createFundraiser(validation.data)

    // Create fundraiser owner with current user and the created fundraiser.
    await createFundraiserOwner({
      fundraiserId: createdFundraiser.id,
      userId: user.id,
    })

    // Cache the created fundraiser for one day.
    await setCachedFundraiserBySlug(createdFundraiser.slug, createdFundraiser)

    // Return the created fundraiser and success message.
    res.status(StatusCodes.CREATED).json({
      success: true,
      status: ReasonPhrases.CREATED,
      message: 'Successfully created fundraiser.',
      data: createdFundraiser,
    })
  } catch (error) {
    next(error)
  }
}
