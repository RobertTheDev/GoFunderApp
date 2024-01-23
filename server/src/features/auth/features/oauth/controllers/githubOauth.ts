import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../../interfaces/ResponseBody'
import { ReasonPhrases } from 'http-status-codes'
import { signInWithGithub } from '../services/oauth.service'
// import createAccount from "../../account/services/account.service"
import prismaClient from 'src/utils/prisma/prismaClient'
// import { findUser } from "src/features/user/services/user.service"

export default async function signInWithGithubHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { params, session } = req
  const { code } = params
  const { user } = session
  try {
    if (user != null || user !== undefined) {
      throw new Error('You are already signed in.')
    }
    if (code == null || code === undefined) {
      throw new Error('No  code was provided.')
    }

    const authenticatedUser = await signInWithGithub(code)

    // Check account exists.
    // const findAccount = await prismaClient.account.findFirst({
    //   where: {
    //     providerAccountId: authenticatedUser.id.toString(),
    //     providerType: "github"
    //   }
    // })

    // If account exists and sign in user.

    // If doesnt created user
    // Create and add account.
    // Sgn session

    await prismaClient.user.create({
      data: {
        email: authenticatedUser.email,
        image: authenticatedUser.avatar_url,
        name: authenticatedUser.name,
      },
    })

    // await createAccount({

    // })

    res.json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully authenticated user with github.',
      data: authenticatedUser,
    })
  } catch (error) {
    next(error)
  }
}
