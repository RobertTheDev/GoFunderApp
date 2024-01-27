import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import prismaClient from '../../../../../utils/prisma/prismaClient.js'
import sendPasswordResetSchema from '../validators/sendPasswordReset.schema.js'
import type ResponseBody from '../../../../../interfaces/ResponseBody.js'
import sendPasswordResetTokenWithSendgrid from 'src/utils/sendgrid/sendPasswordResetToken.js'
import generateId from 'src/utils/idGenerator/index.js'
import { tenMinuteExpiryDateTime } from 'src/configs/expiryManagement/dateExpiryManagement.js'

export async function sendPasswordResetToken(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body } = req

  try {
    // STEP 1: Validate the request body.
    const validation = await sendPasswordResetSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // STEP 2: Check user with inputted email exists.
    const checkUserExists = await prismaClient.user.findUnique({
      where: { email: validation.data.email },
    })

    if (checkUserExists === null) {
      throw new Error('No user exists with that email address.')
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
        email: validation.data.email,
      },
    })

    // STEP 4: Send verification email.
    await sendPasswordResetTokenWithSendgrid(
      validation.data.email,
      emailVerificationToken,
    )

    // STEP 5: Return success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: `Successfully sent password reset email to ${validation.data.email}.`,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
