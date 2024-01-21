import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findFundraiser } from '../services/fundraiser.service.js'
import { getCachedFundraiserBySlug } from '../services/fundraiserCache.service.js'
// import { setCachedCharityBySlug } from "src/features/charity/services/charityCache.service.js"

// Gets fundraiser by id from the cache or prisma database.
export async function getFundraiserById(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { params } = req
  const { slug } = params

  try {
    if (slug == null || slug === undefined) {
      throw new Error('Category is required.')
    }

    const cachedFundraiser = await getCachedFundraiserBySlug(slug)

    if (cachedFundraiser !== null) {
      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found fundraiser from cache.',
        data: cachedFundraiser,
      })
    }

    const fundraiser = await findFundraiser({
      slug,
    })

    // await setCachedCharityBySlug(slug, fundraiser)

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
