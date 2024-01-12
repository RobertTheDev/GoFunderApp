import type { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import {
  hashPassword,
  verifyPassword,
} from '../../../../configs/passwordManagement'
import { changePasswordSchema } from '../../../../models/Auth'
import prismaClient from '../../../../utils/prisma/prismaClient'
import winstonLogger from '../../../../utils/winston/winstonLogger'

export async function changePassword(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { body } = req

  try {
    // STEP 1: Validate the request body.
    const validation = await changePasswordSchema.safeParseAsync(body)

    if (!validation.success) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: validation.error.issues[0]?.message,
        data: null,
      })
    }

    // STEP 2: Find the user.
    const user = await prismaClient.user.findUnique({
      where: {
        email: validation.data.email,
      },
    })

    if (user === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
        data: null,
      })
    }

    // STEP 3: Check current password is correct.
    const isPasswordCorrect = await verifyPassword(
      validation.data.currentPasword,
      String(user.password),
    )

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Password is incorrect.',
        data: null,
      })
    }

    // STEP 4: Hash the new password.
    const hashedPassword = await hashPassword(validation.data.newPassword)

    // STEP 5: Update the user password.
    const updatedUser = await prismaClient.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        email: validation.data.email,
      },
    })

    // STEP 6: Return success message.
    return res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: updatedUser,
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
