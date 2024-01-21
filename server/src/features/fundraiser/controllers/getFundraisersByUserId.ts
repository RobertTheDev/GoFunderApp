import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { FundraiserService } from '../fundraiser.service.js'

// Gets all fundraisers by user ID from the cache or prisma database.
export async function getFundraisersByUserId(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { params } = req
  const { userId } = params

  const fundraiserService = new FundraiserService()
  const cacheService = new CacheService()

  try {
    const cachedFundraisers = await cacheService.get(`fundraisers-${userId}`)

    if (cachedFundraisers !== null) {
      const data = JSON.parse(cachedFundraisers)

      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraisers from cache.',
        data,
      })
    }

    const fundraisers = await fundraiserService.findFundraisers({
      where: { userId },
    })

    if (fundraisers.length > 0) {
      await cacheService.setForTenMinutes(`fundraisers-${userId}`, fundraisers)
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
