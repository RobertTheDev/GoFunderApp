import axios from 'axios'
import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../interfaces/ResponseBody'
import { ReasonPhrases } from 'http-status-codes'

interface IGoogleUser {
  sub: string
  name: string
  given_name: string
  picture: string | null
  locale: string
}

export async function signInWithGoogle(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { code } = req.params
  try {
    const { data: user } = await axios.get<IGoogleUser>(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${code}`,
        },
      },
    )

    res.json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully authenticated user with google.',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}
