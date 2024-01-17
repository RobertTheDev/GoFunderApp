import axios from 'axios'
import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../interfaces/ResponseBody'
import { ReasonPhrases } from 'http-status-codes'

interface AccessTokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

interface IAmazonUser {
  user_id: string
  email: string
  name: string
  postal_code: string
}

export async function signInWithAmazon(
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
    const { data } = await axios.post<AccessTokenResponse>(
      `https://api.amazon.co.uk/auth/o2/token?grant_type=authorization_code&code=${code}&client_secret=${process.env.AMAZON_CLIENT_SECRET}&client_id=${process.env.AMAZON_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/amazon/callback`,
    )

    const { data: authenticatedUser } = await axios.get<IAmazonUser>(
      `https://api.amazon.com/user/profile?access_token=${data.access_token}`,
    )

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
