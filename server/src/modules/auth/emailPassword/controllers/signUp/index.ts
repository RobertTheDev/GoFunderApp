import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { hashPassword } from '../../../../../configs/passwordManagement/index.js'
import prismaClient from '../../../../../utils/prisma/prismaClient.js'
import type ResponseBody from '../../../../../interfaces/ResponseBody.js'
import signUpSchema from './signUp.schema.js'

export async function signUp(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body, session } = req
  const { user } = session

  try {
    // STEP 1: Check user is not signed in.
    if (user != null || user !== undefined) {
      throw new Error('You are already signed in.')
    }

    // STEP 2: Validate the request body.
    const validation = await signUpSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // STEP 3: Check email is not already in use.
    const checkEmailIsInUse = await prismaClient.user.findUnique({
      where: { email: validation.data.email },
    })

    if (checkEmailIsInUse !== null) {
      throw new Error('Email is already in use.')
    }

    // STEP 4: Hash the password.
    const hashedPassword: string = await hashPassword(validation.data.password)

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
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Sign up successful.',
      data: userWithoutPassword,
    })
  } catch (error) {
    next(error)
  }
}
