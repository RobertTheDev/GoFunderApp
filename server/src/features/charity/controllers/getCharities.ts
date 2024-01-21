import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findCharities } from '../services/charity.service.js'
import {
  getCachedCharities,
  setCachedCharities,
} from '../services/charityCache.service.js'

// Gets all charities from the prisma database.
export async function getCharities(
  _req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  try {
    const cachedCharities = await getCachedCharities()

    if (cachedCharities !== null) {
      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found charities from cache.',
        data: cachedCharities,
      })
    }

    const charities = await findCharities({})

    if (charities.length > 0) {
      await setCachedCharities(charities)
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
