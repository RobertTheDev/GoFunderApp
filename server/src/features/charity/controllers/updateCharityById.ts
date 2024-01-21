import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { updateCharitySchema } from '../validators/updateCharity.schema.js'
import { updateCharity } from '../charity.service.js'

export async function updateCharityById(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const {
    body,
    params: { id },
  } = req

  const cacheService = new CacheService()

  try {
    const validation = await updateCharitySchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }
    const updatedCharity = await updateCharity({
      data: validation.data,
      where: { id },
    })

    await cacheService.setForOneDay(updatedCharity.id, updatedCharity)

    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully updated charity.',
      data: updatedCharity,
    })
  } catch (error) {
    next(error)
  }
}
