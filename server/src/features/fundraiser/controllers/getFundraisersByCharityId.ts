import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findFundraisers } from '../services/fundraiser.service.js'
import {
  getCachedFundraisersByCharityId,
  setCachedFundraisersByCharityId,
} from '../services/fundraiserCache.service.js'

// Gets all fundraisers by charity ID from the cache or prisma database.
export async function getFundraisersByUserId(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { params } = req
  const { charityId } = params

  try {
    if (charityId == null || charityId === undefined) {
      throw new Error('Charity ID is required.')
    }

    const cachedFundraisers = await getCachedFundraisersByCharityId(charityId)

    if (cachedFundraisers !== null) {
      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraisers from cache.',
        data: cachedFundraisers,
      })
    }

    const fundraisers = await findFundraisers({
      where: { charityId },
    })

    if (fundraisers.length > 0) {
      await setCachedFundraisersByCharityId(charityId, fundraisers)
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
