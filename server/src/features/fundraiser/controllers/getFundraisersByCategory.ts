import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findFundraisers } from '../services/fundraiser.service.js'

// Gets all fundraisers by category from the cache or prisma database.
export async function getFundraisersByCategory(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { params } = req
  const { category } = params

  const cacheService = new CacheService()

  try {
    const cachedFundraisers = await cacheService.get(`fundraisers-${category}`)

    if (cachedFundraisers !== null) {
      const data = JSON.parse(cachedFundraisers)

      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraisers from cache.',
        data,
      })
    }

    const fundraisers = await findFundraisers({
      where: { category },
    })

    if (fundraisers.length > 0) {
      await cacheService.setForTenMinutes(
        `fundraisers-${category}`,
        fundraisers,
      )
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
