import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CharityService } from '../charity.service.js'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'

// Gets all charities from the prisma database.
export async function getCharities(
  _req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const charityService = new CharityService()
  const cacheService = new CacheService()

  try {
    const cachedCharities = await cacheService.get('charities')

    if (cachedCharities !== null) {
      const data = JSON.parse(cachedCharities)

      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found charities from cache.',
        data,
      })
    }

    const charities = await charityService.findCharities({})

    if (charities.length > 0) {
      await cacheService.setForOneDay('charities', charities)
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found charities.',
      data: charities,
    })
  } catch (error) {
    next(error)
  }
}
