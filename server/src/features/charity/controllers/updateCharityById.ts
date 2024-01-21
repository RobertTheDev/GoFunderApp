import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { updateCharitySchema } from '../validators/updateCharity.schema.js'
import { updateCharity } from '../services/charity.service.js'
import { setCachedCharityBySlug } from '../services/charityCache.service.js'

export async function updateCharityById(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const {
    body,
    params: { id },
  } = req

  try {
    const validation = await updateCharitySchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }
    const updatedCharity = await updateCharity({
      data: validation.data,
      where: { id },
    })

    await setCachedCharityBySlug(updatedCharity.slug, updatedCharity)

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
