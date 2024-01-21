import winstonLogger from '../../../../../utils/winston/winstonLogger.js'
import type { NextFunction, Request, Response } from 'express'
import prismaClient from '../../../../../utils/prisma/prismaClient.js'
import genereateId from '../../../../../configs/idGenerator/index.js'
import { tenMinuteExpiryDateTime } from '../../../../../configs/expiryManagement/dateExpiryManagement.js'
import type ResponseBody from '../../../../../interfaces/ResponseBody.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export async function sendEmailVerification(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { session } = req
  const { user } = session

  try {
    if (user == null) {
      throw new Error('You are not signed in to perform this action.')
    }
    // STEP 2: Check user is not already verified.
    if (user.emailVerified !== null) {
      throw new Error('Your email is already verified.')
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
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully sent email verification.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
