import type { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { verifyPassword } from '../../../../configs/passwordManagement'
import { signInWithEmailAndPasswordSchema } from '../../../../models/Auth'
import prismaClient from '../../../../utils/prisma/prismaClient'
import winstonLogger from '../../../../utils/winston/winstonLogger'

export async function signInWithEmailAndPassword(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { body } = req

  try {
    // STEP 2: Validate the request body.
    const validation =
      await signInWithEmailAndPasswordSchema.safeParseAsync(body)

    if (!validation.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: validation.error.issues[0]?.message,
        data: null,
      })
    }

    // STEP 2: Find the user.
    const user = await prismaClient.user.findUnique({
      where: {
        email: body.email,
      },
    })

    if (user === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
        data: null,
      })
    }

    // STEP 3: Verify the password entered is correct.
    const isPasswordCorrect = await verifyPassword(
      validation.data.password,
      String(user.password),
    )

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Password is incorrect.',
        data: null,
      })
    }

    // STEP 4: Seperate password from user and sign into session.
    const { password: _, ...userWithoutPassword } = user

    req.session.user = userWithoutPassword

    // STEP 5: Return the signed in user.
    return res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: userWithoutPassword,
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
}
