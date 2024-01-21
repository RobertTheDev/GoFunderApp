import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import twoFactor from 'node-2fa'
import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../interfaces/ResponseBody'
// import { UserService } from 'src/modules/user/user.service'
import QRCode from 'qrcode'
import winstonLogger from 'src/utils/winston/winstonLogger'

export async function generateTotpSecret(
  _req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  // const { session } = req
  // const { user } = session
  // const userService = new UserService()

  try {
    // if (user == null || user === undefined) {
    //   throw new Error('You are not signed in to perform this action.')
    // }

    // const findUser = await userService.findUser({ id: user.id })

    // if (findUser == null) {
    //   throw new Error('')
    // }

    // if (findUser.mfaType != null) {
    //   throw new Error('')
    // }

    const generatedSecret: {
      secret: string
      uri: string
      qr: string
    } = twoFactor.generateSecret({
      name: 'GoFunderApp',
      account: 'robert',
    })

    if (generatedSecret == null) {
      throw new Error('No secret was generated.')
    }
    winstonLogger.info(generatedSecret)

    const qrCode: string = await QRCode.toDataURL(generatedSecret.uri)

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully generated secret.',
      data: { secret: generatedSecret.secret, qrCode },
    })
  } catch (error) {
    next(error)
  }
}
