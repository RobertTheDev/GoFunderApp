import type { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import prismaClient from '../../../../utils/prisma/prismaClient'
import winstonLogger from '../../../../utils/winston/winstonLogger'
import sendPasswordResetSchema from '../validators/sendPasswordReset.schema'

export async function sendPasswordResetToken(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { body } = req

  try {
    // STEP 2: Validate the request body.
    const validation = await sendPasswordResetSchema.safeParseAsync(body)

    if (!validation.success) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: validation.error.issues[0]?.message,
        data: null,
      })
    }

    // STEP 3: Check user with inputted email exists.
    const checkUserExists = await prismaClient.user.findUnique({
      where: { email: validation.data.email },
    })

    if (checkUserExists === null) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: 'No user exists with that email address.',
        data: null,
      })
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
