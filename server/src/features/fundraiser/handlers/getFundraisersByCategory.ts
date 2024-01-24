import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findFundraisers } from '../services/fundraiser.service.js'
import {
  getCachedFundraisersByCategory,
  setCachedFundraisersByCategory,
} from '../services/fundraiserCache.service.js'

// Gets all fundraisers by category from the prisma database.
export async function getFundraisersByCategoryHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { params } = req
  const { category } = params

  try {
    if (category == null || category === undefined) {
      throw new Error('No category was provided.')
    }

    const cachedFundraisers = await getCachedFundraisersByCategory(category)

    if (cachedFundraisers !== null) {
      res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraisers from cache.',
        data: cachedFundraisers,
      })

      return
    }

    const fundraisers = await findFundraisers({ where: { category } })

    if (fundraisers.length > 0) {
      await setCachedFundraisersByCategory(category, fundraisers)
    }

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found fundraisers.',
      data: fundraisers,
    })
  } catch (error) {
    next(error)
  }
}
