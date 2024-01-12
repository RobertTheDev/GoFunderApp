import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winstonLogger from '../../../../utils/winston/winstonLogger'
import type { Request, Response } from 'express'
import prismaClient from 'src/utils/prisma/prismaClient'

export async function verifyEmailWithToken(
  req: Request,
  res: Response,
): Promise<Response<any>> {
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
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: 'Verification token is invalid.',
      })
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

    return res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      data,
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
