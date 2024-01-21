import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findFundraisers } from '../services/fundraiser.service.js'
import {
  getCachedFundraisersByUserId,
  setCachedFundraisersByUserId,
} from '../services/fundraiserCache.service.js'

// Gets all fundraisers by user ID from the cache or prisma database.
export async function getFundraisersByUserId(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { params } = req
  const { userId } = params

  try {
    if (userId == null || userId === undefined) {
      throw new Error('User ID is required.')
    }

    const cachedFundraisers = await getCachedFundraisersByUserId(userId)

    if (cachedFundraisers !== null) {
      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraisers from cache.',
        data: cachedFundraisers,
      })
    }

    const fundraisers = await findFundraisers({
      where: { userId },
    })

    if (fundraisers.length > 0) {
      await setCachedFundraisersByUserId(userId, fundraisers)
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
