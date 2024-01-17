import axios from 'axios'
import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../interfaces/ResponseBody'
import { ReasonPhrases } from 'http-status-codes'

export async function signInWithFacebook(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { code } = req.params

  try {
    const { data } = await axios.post<{
      access_token: string
      token_type: string
      expires_in: number
    }>(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/facebook/callback&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`,
    )

    const { data: user } = await axios.get(
      `https://graph.facebook.com/me?fields=name,gender,location,picture,email&access_token=${data.access_token}`,
    )

    res.json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully authenticated user with facebook.',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}
