import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type { Charity } from '@prisma/client'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findCharity } from '../services/charity.service.js'
import {
  getCachedCharityBySlug,
  setCachedCharityBySlug,
} from '../services/charityCache.service.js'

export async function getCharityBySlug(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { params } = req

  const { slug } = params

  try {
    if (slug === undefined) {
      throw new Error('No slug was provided.')
    }

    const cachedCharity = await getCachedCharityBySlug(slug)

    if (cachedCharity !== null) {
      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found charity from cache.',
        data: cachedCharity,
      })
    }

    const charity: Charity | null = await findCharity({ slug })

    if (charity === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        status: ReasonPhrases.NOT_FOUND,
        message: 'Charity not found.',
        data: null,
      })
    }

    await setCachedCharityBySlug(slug, charity)

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
