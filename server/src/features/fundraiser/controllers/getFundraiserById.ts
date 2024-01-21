import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { FundraiserService } from '../fundraiser.service.js'

// Gets fundraiser by id from the cache or prisma database.
export async function getFundraiserById(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { params } = req
  const { id } = params

  const fundraiserService = new FundraiserService()
  const cacheService = new CacheService()

  try {
    const cachedFundraiser = await cacheService.get(`fundraisers-${id}`)

    if (cachedFundraiser !== null) {
      const data = JSON.parse(cachedFundraiser)

      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraiser from cache.',
        data,
      })
    }

    const fundraiser = await fundraiserService.findFundraiser({
      id,
    })

    await cacheService.setForTenMinutes(`fundraisers-${id}`, fundraiser)

    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found fundraiser.',
      data: fundraiser,
    })
  } catch (error) {
    next(error)
  }
}
