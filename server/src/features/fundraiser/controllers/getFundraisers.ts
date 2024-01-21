import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findFundraisers } from '../services/fundraiser.service.js'
import {
  getCachedFundraisers,
  setCachedFundraisers,
} from '../services/fundraiserCache.service.js'

// Gets all fundraisers from the prisma database.
export async function getFundraisers(
  _req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  try {
    const cachedFundraisers = await getCachedFundraisers()

    if (cachedFundraisers !== null) {
      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraisers from cache.',
        data: cachedFundraisers,
      })
    }

    const fundraisers = await findFundraisers({})

    if (fundraisers.length > 0) {
      await setCachedFundraisers(fundraisers)
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
