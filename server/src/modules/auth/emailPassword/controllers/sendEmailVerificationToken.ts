import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winstonLogger from '../../../../utils/winston/winstonLogger'
import type { Request, Response } from 'express'
import prismaClient from 'src/utils/prisma/prismaClient'
import genereateId from 'src/configs/idGenerator'
import { tenMinuteExpiryDateTime } from 'src/configs/expiryManagement/dateExpiryManagement'

export async function sendEmailVerification(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { session } = req

  try {
    // STEP 2: Check user is not already verified.
    if (session.user?.emailVerified !== null) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: 'Your email is already verified.',
        data: null,
      })
    }

    // STEP 3: Create the verification request.
    const generatedToken = genereateId()

    await prismaClient.verificationRequest.create({
      data: {
        expires: tenMinuteExpiryDateTime,
        identifier: 'email-verification',
        token: generatedToken,
      },
    })

    // STEP 4: Send the email.
    winstonLogger.info(`Token: ${generatedToken}.`)

    // STEP 5: Return success message.
    return res.json({
      message: 'Successfully sent email verification.',
      token: generatedToken,
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
