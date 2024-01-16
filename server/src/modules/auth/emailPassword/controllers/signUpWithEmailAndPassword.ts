import type { Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { hashPassword } from '../../../../configs/passwordManagement/index.js'
import prismaClient from '../../../../utils/prisma/prismaClient.js'
import winstonLogger from '../../../../utils/winston/winstonLogger.js'
import signUpWithEmailAndPasswordSchema from '../validators/signUpWithEmailAndPassword.schema.js'

export async function signUpWithEmailAndPassword(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  const { body } = req

  try {
    // STEP 2: Validate the request body.
    const validation =
      await signUpWithEmailAndPasswordSchema.safeParseAsync(body)

    if (!validation.success) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: validation.error.issues[0]?.message,
        data: null,
      })
    }

    // STEP 3: Check email is not already in use.
    const checkEmailIsInUse = await prismaClient.user.findUnique({
      where: { email: validation.data.email },
    })

    if (checkEmailIsInUse?.password === null) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: 'This email was set up to use passwordless sign in.',
        data: null,
      })
    }

    if (checkEmailIsInUse !== null) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: 'Email is already in use.',
        data: null,
      })
    }

    // STEP 4: Hash the password.
    const hashedPassword = await hashPassword(validation.data.password)

    // STEP 5: Create the user.
    const signedUpUser = await prismaClient.user.create({
      data: {
        ...validation.data,
        password: hashedPassword,
      },
    })

    // STEP 6: Seperate password from user and sign into session.
    const { password: _, ...userWithoutPassword } = signedUpUser

    req.session.user = userWithoutPassword

    // STEP 7: Return the signed user.
    return res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: userWithoutPassword,
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      data: null,
    })
  }
}
