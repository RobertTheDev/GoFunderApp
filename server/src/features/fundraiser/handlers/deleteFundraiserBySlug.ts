import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import {
  deleteFundraiser,
  findFundraiser,
} from '../services/fundraiser.service.js'
import { deleteCachedFundraiserBySlug } from '../services/fundraiserCache.service.js'
import { deleteFundraiserOwnerByFundraiserId } from '../../fundraiserOwner/services/fundraiserOwner.service.js'
import prismaClient from '../../../utils/prisma/prismaClient.js'

// This handler deletes a fundraiser with its slug.

export async function deleteFundraiserBySlugHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { session, params } = req
  const { user } = session
  const { slug } = params

  try {
    if (slug == null || slug === undefined) {
      throw new Error('No fundraiser slug was provided.')
    }
    // If no user is in session return an error.
    // If no user is found return an error message.
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    const fundraiser = await findFundraiser({ slug })

    if (fundraiser == null) {
      throw new Error('No fundraiser was found.')
    }

    const isOwner = await prismaClient.fundraiserOwner.findFirst({
      where: { fundraiserId: fundraiser.id, userId: user.id },
    })

    if (isOwner == null) {
      throw new Error('You are not autoprised to perform this action.')
    }

    // Create a fundraiser with validated data.
    await deleteFundraiser({ id: fundraiser.id })

    // Create fundraiser owner with current user and the created fundraiser.
    await deleteFundraiserOwnerByFundraiserId(fundraiser.id)

    // Cache the created fundraiser for one day.
    await deleteCachedFundraiserBySlug(slug)

    // Return the created fundraiser and success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully deleted fundraiser.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
