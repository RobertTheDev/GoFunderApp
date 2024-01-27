import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import {
  hashPassword,
  verifyPassword,
} from '../../../../../utils/passwordManagement/index.js'
import prismaClient from '../../../../../utils/prisma/prismaClient.js'
import changePasswordSchema from '../validators/changePassword.schema.js'
import type ResponseBody from '../../../../../interfaces/ResponseBody.js'

export async function changePassword(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body, session } = req
  const { user } = session

  try {
    if (user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    // STEP 1: Validate the request body.
    const validation = await changePasswordSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // STEP 2: Find the user.
    const findUser = await prismaClient.user.findUnique({
      where: {
        id: user.id,
      },
    })

    if (findUser == null) {
      throw new Error('No user was found with that email.')
    }

    if (findUser.password == null) {
      throw new Error(
        'Your account was not set up to use email and password. Please try magic link authentication instead.',
      )
    }

    // STEP 3: Check current password is correct.
    const isPasswordCorrect = await verifyPassword(
      validation.data.currentPassword,
      findUser.password,
    )

    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect.')
    }

    // STEP 4: Hash the new password.
    const hashedPassword = await hashPassword(validation.data.newPassword)

    // STEP 5: Update the user password.
    await prismaClient.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: user.id,
      },
    })

    // STEP 6: Return success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Password successfully changed.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
