import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import prismaClient from '../../../../utils/prisma/prismaClient.js'
import { hashPassword } from '../../../../configs/passwordManagement/index.js'
import resetPasswordSchema from '../validators/resetPassword.schema.js'
import type ResponseBody from '../../../../interfaces/ResponseBody.js'

export async function resetPasswordWithToken(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body } = req

  try {
    // STEP 1: Validate the request body.
    const validation = await resetPasswordSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // STEP 2: Check the verification request and if user is verfified.
    const isVerified = await prismaClient.verificationRequest.findUnique({
      where: {
        token: validation.data.accessToken,
      },
    })

    if (isVerified == null) {
      throw new Error('You are not authorised to perform this action.')
    }

    await prismaClient.verificationRequest.delete({
      where: { token: validation.data.accessToken },
    })

    // STEP 3: Hash the password.
    const hashedPassword = await hashPassword(validation.data.password)

    // STEP 4: Update the user.
    await prismaClient.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        email: validation.data.email,
      },
    })

    // STEP 5: Return success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully reset password. You can now sign in again.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
