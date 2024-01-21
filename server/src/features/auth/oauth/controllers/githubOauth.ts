import axios from 'axios'
import type { NextFunction, Request, Response } from 'express'
import type ResponseBody from '../../../../interfaces/ResponseBody'
import { ReasonPhrases } from 'http-status-codes'

interface IGithubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: false
  name: string
  company: string | null
  blog: string
  location: string
  email: string
  hireable: boolean
  bio: string
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: Date
  updated_at: Date
}

export async function signInWithGithub(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { code } = req.params
  try {
    const getAccessToken = await axios.post(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
      {},
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token: accessToken } = getAccessToken.data

    const { data: user } = await axios.get<IGithubUser>(
      `https://api.github.com/user`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    res.json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully authenticated user with github.',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}
