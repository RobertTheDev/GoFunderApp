import type { NextFunction, Request, Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { hashPassword } from '../../../../../utils/passwordManagement/index.js'
import prismaClient from '../../../../../utils/prisma/prismaClient.js'
import type ResponseBody from '../../../../../interfaces/ResponseBody.js'
import signUpWithEmailAndPasswordSchema from '../validators/signUp.schema.js'
import slugify from 'slugify'
import { countUsersByUsername } from '../../../../profile/services/profile.service.js'
import createSession from '../../session/services/session.service.js'
import { slugifyUsernameSettings } from '../../../../../utils/slugManagement/slugifySettings.js'

export default async function signUpWithEmailAndPasswordHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body } = req

  try {
    // STEP 1: Validate the request body.
    const validation =
      await signUpWithEmailAndPasswordSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // STEP 2: Check email is not already in use.
    const checkEmailIsInUse = await prismaClient.user.findUnique({
      where: { email: validation.data.email },
    })

    if (checkEmailIsInUse !== null) {
      throw new Error('Email is already in use.')
    }

    // STEP 3: Hash the password.
    const hashedPassword: string = await hashPassword(validation.data.password)

    // STEP 4: Slugify name to create default username.
    let username = slugify(validation.data.name, slugifyUsernameSettings)

    // Create a username by slugifying name and adding a number at end by attempts.
    let attempt = 0

    while ((await countUsersByUsername(username)) > 0) {
      attempt += 1
      username = username.replace(/\.\d+$/, '') + `${attempt}`
    }

    // STEP 5: Create the user.
    const signedUpUser = await prismaClient.user.create({
      data: {
        ...validation.data,
        password: hashedPassword,
        username,
      },
    })

    // STEP 6: Seperate password from user, sign into session and create session in db.
    const { password: _, ...userWithoutPassword } = signedUpUser

    req.session.user = userWithoutPassword
    req.session.mfaVerified = null

    await createSession({
      sessionId: req.sessionID,
      expires: req.session.cookie.expires,
      userId: userWithoutPassword.id,
    })

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
