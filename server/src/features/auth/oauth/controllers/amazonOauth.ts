import axios from 'axios'
import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../interfaces/ResponseBody'
import { ReasonPhrases } from 'http-status-codes'
import { signInWithAmazon } from '../oauth.service'

export async function signInWithAmazonHandler(
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

    const authenticatedUser = await signInWithAmazon(code)

    res.json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully authenticated user with amazon.',
      data: authenticatedUser,
    })
  } catch (error) {
    next(error)
  }
}
