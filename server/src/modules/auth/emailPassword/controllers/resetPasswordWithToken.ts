import type { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import prismaClient from '../../../../utils/prisma/prismaClient'
import winstonLogger from '../../../../utils/winston/winstonLogger'
import { hashPassword } from '../../../../configs/passwordManagement'
import resetPasswordSchema from '../validators/resetPassword.schema'

export async function resetPasswordWithToken(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { body } = req

  try {
    // STEP 2: Validate the request body.
    const validation = await resetPasswordSchema.safeParseAsync(body)

    if (!validation.success) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: validation.error.issues[0]?.message,
        data: null,
      })
    }

    // STEP 3: Check the verification request and if user is verfified.
    const isVerified = await prismaClient.verificationRequest.findUnique({
      where: {
        token: validation.data.accessToken,
      },
    })

    if (isVerified === null) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: StatusCodes.UNAUTHORIZED,
        data: null,
      })
    }

    await prismaClient.verificationRequest.delete({
      where: { token: validation.data.accessToken },
    })

    // STEP 4: Hash the password.
    const hashedPassword = await hashPassword(validation.data.password)

    // STEP 5: Update the user.
    await prismaClient.user.update({
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
      data: null,
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      data: null,
    })
  }
}
