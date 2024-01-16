import axios from 'axios'
import type { Request, Response } from 'express'
import winstonLogger from '../../../utils/winston/winstonLogger.js'

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
  res: Response,
): Promise<Response<any>> {
  try {
    const { code } = req.params

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

    return res.json({ data: user })
  } catch (error) {
    winstonLogger.error(error)

    return res.json('Error')
  }
}

interface IGoogleUser {
  sub: string
  name: string
  given_name: string
  picture: string | null
  locale: string
}

export async function signInWithGoogle(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  try {
    const { accessToken } = req.params

    const { data: user } = await axios.get<IGoogleUser>(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return res.json({ data: user })
  } catch (error) {
    winstonLogger.error(error)

    return res.json('Error')
  }
}

interface AccesTokenResponse {
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
  res: Response,
): Promise<Response<any>> {
  try {
    const { code } = req.params

    const { data } = await axios.post<AccesTokenResponse>(
      `https://api.amazon.co.uk/auth/o2/token?grant_type=authorization_code&code=${code}&client_secret=${process.env.AMAZON_CLIENT_SECRET}&client_id=${process.env.AMAZON_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/amazon/callback`,
    )

    const { data: user } = await axios.get<IAmazonUser>(
      `https://api.amazon.com/user/profile?access_token=${data.access_token}`,
    )

    return res.json({ data: user })
  } catch (error) {
    winstonLogger.error(error)

    return res.json('Error')
  }
}

export async function signInWithFacebook(
  req: Request,
  res: Response,
): Promise<Response<any>> {
  try {
    const { code } = req.params

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

    return res.json({ data: user })
  } catch (error) {
    winstonLogger.error(error)

    return res.json('Error')
  }
}
