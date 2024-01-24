import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import updateFundraiserSchema from '../validators/updateFundraiser.schema.js'
import {
  findFundraiser,
  updateFundraiser,
} from '../services/fundraiser.service.js'

export async function updateCharityFundraiserBySlugHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { body, params, session } = req
  const { slug } = params
  const { user } = session

  try {
    if (slug == null || slug === undefined) {
      throw new Error('No slug was provided.')
    }
    // If no user is in session return an error.
    if (user == null || user === undefined) {
      throw new Error('You are not signed in.')
    }

    const validation = await updateFundraiserSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    const fundraiser = await findFundraiser({
      slug,
    })

    if (fundraiser == null) {
      throw new Error('No fundraiser found.')
    }

    const updatedFundraiser = await updateFundraiser({
      where: { slug },
      data: validation.data,
    })

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully updated fundraiser.',
      data: updatedFundraiser,
    })
  } catch (error) {
    next(error)
  }
}
