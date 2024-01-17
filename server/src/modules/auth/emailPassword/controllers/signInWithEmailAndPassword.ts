import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { verifyPassword } from '../../../../configs/passwordManagement/index.js'
import prismaClient from '../../../../utils/prisma/prismaClient.js'
import signInWithEmailAndPasswordSchema from '../validators/signInWithEmailAndPassword.schema.js'
import type ResponseBody from '../../../../interfaces/ResponseBody.js'

export async function signInWithEmailAndPassword(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body, session } = req
  const { user } = session

  try {
    if (user != null || user !== undefined) {
      throw new Error('You are already signed in.')
    }
    // STEP 2: Validate the request body.
    const validation =
      await signInWithEmailAndPasswordSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // STEP 2: Find the user.
    const findUser = await prismaClient.user.findUnique({
      where: {
        email: body.email,
      },
    })

    if (findUser === null) {
      throw new Error('No user with that email exists.')
    }

    // STEP 3: Verify the password entered is correct.
    const isPasswordCorrect = await verifyPassword(
      validation.data.password,
      String(findUser.password),
    )

    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect.')
    }

    // STEP 4: Seperate password from user and sign into session.
    const { password: _, ...userWithoutPassword } = findUser

    req.session.user = userWithoutPassword

    // STEP 5: Return the signed in user.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: ReasonPhrases.OK,
      data: userWithoutPassword,
    })
  } catch (error) {
    next(error)
  }
}
