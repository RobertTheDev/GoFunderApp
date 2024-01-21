import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type { NextFunction, Request, Response } from 'express'
import prismaClient from '../../../../utils/prisma/prismaClient.js'
import type ResponseBody from '../../../../interfaces/ResponseBody.js'

export async function verifyEmailWithToken(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const {
    body: { email, token },
  } = req
  try {
    const findVerificationRequest =
      await prismaClient.verificationRequest.findUnique({
        where: {
          token,
        },
      })

    if (findVerificationRequest === null) {
      throw new Error('Verification token is invalid.')
    }

    await prismaClient.verificationRequest.delete({ where: { token } })

    const data = await prismaClient.user.update({
      data: {
        emailVerified: new Date(),
      },
      where: {
        email,
      },
    })

    res.status(StatusCodes.OK).send({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully verified email address.',
      data,
    })
  } catch (error) {
    next(error)
  }
}
