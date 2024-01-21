import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../interfaces/ResponseBody'
import { ReasonPhrases } from 'http-status-codes'
import { signInWithGithub } from '../oauth.service'

export default async function signInWithGithubHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { params, session } = req
  const { code } = params
  const { user } = session
  try {
    if (user != null) {
      throw new Error('You are already signed in.')
    }
    if (code == null || code === undefined) {
      throw new Error('No  code was provided.')
    }

    const authenticatedUser = await signInWithGithub(code)

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
