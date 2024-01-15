import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CharityService } from '../charity.service.js'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'

export async function deleteCharityById(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const {
    params: { id },
  } = req

  const charityService = new CharityService()
  const cacheService = new CacheService()

  try {
    if (id === undefined) {
      throw new Error('No charity ID was provided.')
    }

    await charityService.deleteCharity({
      id,
    })

    await cacheService.delete(id)

    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully deleted charity.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
