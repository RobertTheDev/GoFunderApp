import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import twoFactor from 'node-2fa'
import winstonLogger from '../../../utils/winston/winstonLogger.js'
import type { Request, Response } from 'express'

export async function generateTotpSecret(
  _req: Request,
  res: Response,
): Promise<Response<any>> {
  try {
    const newSecret = twoFactor.generateSecret({
      name: 'GoFunder',
      account: 'roberthawker',
    })

    return res.json({
      message: 'Successfully generated secret.',
      newSecret,
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.json(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function verifyTotpToken(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { body } = req

  try {
    const newSecret = twoFactor.verifyToken(
      'SUA34MAIHUFLIDMI46SDLVUIKOUFQAK2',
      body.token,
    )

    return res.json({
      message: 'Successfully generated token.',
      newSecret,
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.json(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
