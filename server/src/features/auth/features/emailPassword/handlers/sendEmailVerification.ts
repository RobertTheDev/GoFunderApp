import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import prismaClient from '../../../../../utils/prisma/prismaClient.js'
import type ResponseBody from '../../../../../interfaces/ResponseBody.js'
import generateId from 'src/utils/idGenerator/index.js'
import { tenMinuteExpiryDateTime } from 'src/utils/expiryManagement/dateExpiryManagement.js'
import sendEmailVerificationWithSendgrid from 'src/utils/sendgrid/sendEmailVerification.js'

export async function sendEmailVerification(
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

    // STEP 2: Check user with inputted email exists.
    const findUser = await prismaClient.user.findUnique({
      where: { id: user.id },
    })

    if (findUser == null) {
      throw new Error('No user found.')
    }

    if (findUser.email == null) {
      throw new Error('No user exists with that email address.')
    }

    if (findUser.emailVerified != null) {
      throw new Error('Your email has already been verified.')
    }

    // STEP 3: Update the user with email verification token and expiry.
    const emailVerificationToken = generateId()
    const emailVerificationTokenExpiry = tenMinuteExpiryDateTime

    await prismaClient.user.update({
      data: {
        emailVerificationToken,
        emailVerificationTokenExpiry,
      },
      where: {
        id: user.id,
      },
    })

    // STEP 4: Send verification email.
    await sendEmailVerificationWithSendgrid(
      findUser.email,
      emailVerificationToken,
    )

    // STEP 5: Return success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: `Successfully sent password reset email to ${findUser.email}.`,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
