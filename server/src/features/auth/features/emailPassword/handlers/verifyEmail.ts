import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import prismaClient from '../../../../../utils/prisma/prismaClient.js'
import type ResponseBody from '../../../../../interfaces/ResponseBody.js'
import { isPast } from 'date-fns'

export async function verifyEmail(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { params } = req
  const { code } = params

  try {
    if (code == null || code === undefined) {
      throw new Error('No code was provided.')
    }

    // STEP 2: Check the verification request and if user is verfified.
    const user = await prismaClient.user.findFirst({
      where: { emailVerificationToken: code },
    })

    if (user == null) {
      throw new Error('No user was found with that verification token.')
    }

    if (
      user.emailVerificationToken == null ||
      user.emailVerificationTokenExpiry == null
    ) {
      throw new Error('No valid verification token was provided.')
    }

    if (user.emailVerified != null) {
      throw new Error('Your email has already been verified.')
    }

    if (isPast(new Date(String(user.emailVerificationTokenExpiry)))) {
      throw new Error(
        "You're verification token has expired. Please request for a new password reset email.",
      )
    }

    // STEP 4: Update the user.
    await prismaClient.user.update({
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
        emailVerificationTokenExpiry: null,
      },
      where: {
        id: user.id,
      },
    })

    // STEP 5: Return success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully verified your email address.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
