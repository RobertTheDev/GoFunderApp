import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import twoFactor from 'node-2fa'
import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../interfaces/ResponseBody'
import { verifyTotpCodeSchema } from '../validators/verifyTotp.schema'

export async function verifyTotpCode(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body } = req

  try {
    const validation = await verifyTotpCodeSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    const { code } = validation.data

    const verifyResult = twoFactor.verifyToken(
      'QKX2KGY633TO35JUTC5Y2A25VD3XS7SX',
      code,
    )

    if (verifyResult == null) {
      throw new Error(
        'Code entered is invalid. Please try again with a new code.',
      )
    }

    if (verifyResult.delta === 1) {
      throw new Error('Code entered too early. Please try again.')
    }

    if (verifyResult.delta === -1) {
      throw new Error('Code has expired. Please try again with a new code.')
    }

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully verfified code.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
