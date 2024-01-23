import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findFundraiser } from '../services/fundraiser.service.js'
import {
  getCachedFundraiserBySlug,
  setCachedFundraiserBySlug,
} from '../services/fundraiserCache.service.js'

// Gets fundraiser by id from the cache or prisma database.
export async function getFundraiserBySlugHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { params } = req
  const { slug } = params

  try {
    if (slug == null || slug === undefined) {
      throw new Error('Slug is required.')
    }

    const cachedFundraiser = await getCachedFundraiserBySlug(slug)

    if (cachedFundraiser !== null) {
      res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraiser from cache.',
        data: cachedFundraiser,
      })

      return
    }

    const fundraiser = await findFundraiser({
      slug,
    })

    await setCachedFundraiserBySlug(slug, fundraiser)

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found fundraiser.',
      data: fundraiser,
    })
  } catch (error) {
    next(error)
  }
}
