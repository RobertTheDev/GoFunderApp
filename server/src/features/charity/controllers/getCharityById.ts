import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type { Charity } from '@prisma/client'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findCharity } from '../charity.service.js'

export async function getCharityById(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { params } = req

  const { id } = params

  const cacheService = new CacheService()

  try {
    if (id === undefined) {
      throw new Error('No charity ID was provided.')
    }

    const cachedCharity = await cacheService.get(id)

    if (cachedCharity !== null) {
      const data = JSON.parse(cachedCharity)

      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found charity from cache.',
        data,
      })
    }

    const charity: Charity | null = await findCharity({ id })

    if (charity === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        status: ReasonPhrases.NOT_FOUND,
        message: 'Charity not found.',
        data: null,
      })
    }

    await cacheService.setForOneDay(charity.id, charity)

    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found charity from database.',
      data: charity,
    })
  } catch (error) {
    next(error)
  }
}
