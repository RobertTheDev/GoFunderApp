import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findFundraiser } from '../services/fundraiser.service.js'

// Gets fundraiser by id from the cache or prisma database.
export async function getFundraiserByIdHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { params } = req
  const { id } = params

  try {
    if (id == null || id === undefined) {
      throw new Error('ID is required.')
    }

    const fundraiser = await findFundraiser({
      id,
    })

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
