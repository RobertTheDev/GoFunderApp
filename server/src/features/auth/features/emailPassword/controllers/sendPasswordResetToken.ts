import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import prismaClient from '../../../../../utils/prisma/prismaClient.js'
import sendPasswordResetSchema from '../validators/sendPasswordReset.schema.js'
import type ResponseBody from '../../../../../interfaces/ResponseBody.js'

export async function sendPasswordResetToken(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body, session } = req
  const { user } = session

  try {
    if (user == null) {
      throw new Error('You are not signed in to perform this action.')
    }
    // STEP 2: Validate the request body.
    const validation = await sendPasswordResetSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // STEP 3: Check user with inputted email exists.
    const checkUserExists = await prismaClient.user.findUnique({
      where: { email: validation.data.email },
    })

    if (checkUserExists === null) {
      throw new Error('No user exists with that email address.')
    }

    // STEP 4: Create the verification request.
    await prismaClient.verificationRequest.create({
      data: {
        expires: '',
        identifier: '',
        token: '',
      },
    })

    // STEP 5: Send verification email.

    // STEP 6: Return success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully sent password reset token.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
