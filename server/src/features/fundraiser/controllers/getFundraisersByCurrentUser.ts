import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findFundraisers } from '../services/fundraiser.service.js'
import {
  getCachedFundraisersByUserId,
  setCachedFundraisersByUserId,
} from '../services/fundraiserCache.service.js'

// Gets all fundraisers by current user from the cache or prisma database.
export async function getFundraisersByUserId(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { session } = req
  const { user } = session

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

    const cachedFundraisers = await getCachedFundraisersByUserId(user.id)

    if (cachedFundraisers !== null) {
      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraisers from cache.',
        data: cachedFundraisers,
      })
    }

    const fundraisers = await findFundraisers({
      where: { userId: user.id },
    })

    if (fundraisers.length > 0) {
      await setCachedFundraisersByUserId(user.id, fundraisers)
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found fundraisers.',
      data: fundraisers,
    })
  } catch (error) {
    next(error)
  }
}
