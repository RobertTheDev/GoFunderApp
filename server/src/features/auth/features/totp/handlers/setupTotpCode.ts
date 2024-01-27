import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import twoFactor from 'node-2fa'
import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../../interfaces/ResponseBody'
import { verifyTotpCodeSchema } from '../validators/verifyTotp.schema'
import prismaClient from 'src/utils/prisma/prismaClient'

export async function setUpTotpCode(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body, session } = req
  const { user } = session

  try {
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    const findUser = await prismaClient.user.findUnique({
      where: { id: user.id },
    })

    if (findUser == null) {
      throw new Error('No user found.')
    }

    if (findUser.mfaSecret == null) {
      throw new Error('No MFS secret is associated with the user account.')
    }

    const validation = await verifyTotpCodeSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    const { code } = validation.data

    const verifyResult = twoFactor.verifyToken(findUser.mfaSecret, code)

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

    await prismaClient.user.update({
      data: {
        mfaType: 'authenticator',
      },
      where: {
        id: user.id,
      },
    })

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully set up MFA.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
