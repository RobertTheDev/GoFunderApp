import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import twoFactor from 'node-2fa'
import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../../interfaces/ResponseBody'
import QRCode from 'qrcode'
import prismaClient from '../../../../../utils/prisma/prismaClient'

export async function generateTotpSecret(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { session } = req
  const { user } = session

  try {
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    const generatedSecret: {
      secret: string
      uri: string
      qr: string
    } = twoFactor.generateSecret({
      name: 'GoFunderApp',
      account: user.email ?? 'Account',
    })

    if (generatedSecret == null) {
      throw new Error('No secret was generated.')
    }

    await prismaClient.user.update({
      data: {
        mfaSecret: generatedSecret.secret,
      },
      where: {
        id: user.id,
      },
    })

    const qrCode: string = await QRCode.toDataURL(generatedSecret.uri)

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully generated secret.',
      data: { qrCode },
    })
  } catch (error) {
    next(error)
  }
}
