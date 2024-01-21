import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { hashPassword } from '../../../../configs/passwordManagement/index.js'
import prismaClient from '../../../../utils/prisma/prismaClient.js'
import type ResponseBody from '../../../../interfaces/ResponseBody.js'
import signUpWithEmailAndPasswordSchema from '../validators/signUp.schema.js'
import slugify from 'slugify'
import { countUsersByUsername } from '../../../../features/user/user.service.js'

export default async function signUpWithEmailAndPassword(
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
    const validation =
      await signUpWithEmailAndPasswordSchema.safeParseAsync(body)

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

    // STEP 5: Slugify name to create default username.
    let username = slugify(validation.data.name, {
      replacement: '.', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    })

    let attempt = 0

    while ((await countUsersByUsername(username)) > 0) {
      attempt += 1
      username = username.replace(/\.\d+$/, '') + `.${attempt}`
    }

    // STEP 6: Create the user.
    const signedUpUser = await prismaClient.user.create({
      data: {
        ...validation.data,
        password: hashedPassword,
        username,
      },
    })

    // STEP 7: Seperate password from user and sign into session.
    const { password: _, ...userWithoutPassword } = signedUpUser

    req.session.user = userWithoutPassword

    // STEP 8: Return the signed user.
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
