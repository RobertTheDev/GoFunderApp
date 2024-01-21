import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { FundraiserService } from '../fundraiser.service.js'

// Gets all fundraisers from the prisma database.
export async function getFundraisers(
  _req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const fundraiserService = new FundraiserService()
  const cacheService = new CacheService()

  try {
    const cachedFundraisers = await cacheService.get('fundraisers')

    if (cachedFundraisers !== null) {
      const data = JSON.parse(cachedFundraisers)

      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraisers from cache.',
        data,
      })
    }

    const fundraisers = await fundraiserService.findFundraisers({})

    if (fundraisers.length > 0) {
      await cacheService.setForOneDay('fundraisers', fundraisers)
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
