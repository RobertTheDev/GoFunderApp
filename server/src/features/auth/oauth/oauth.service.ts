import axios from 'axios'
import type {
  AccessTokenResponse,
  IAmazonUser,
  IGithubUser,
  IGoogleUser,
} from './oauth.models'

export async function signInWithAmazon(code: string): Promise<IAmazonUser> {
  const { data } = await axios.post<AccessTokenResponse>(
    `https://api.amazon.co.uk/auth/o2/token?grant_type=authorization_code&code=${code}&client_secret=${process.env.AMAZON_CLIENT_SECRET}&client_id=${process.env.AMAZON_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/amazon/callback`,
  )

  const { data: authenticatedUser } = await axios.get<IAmazonUser>(
    `https://api.amazon.com/user/profile?access_token=${data.access_token}`,
  )

  return authenticatedUser
}

export async function signInWithFacebook(code: string): Promise<IAmazonUser> {
  const { data } = await axios.post<{
    access_token: string
    token_type: string
    expires_in: number
  }>(
    `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/facebook/callback&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`,
  )

  const { data: authenticatedUser } = await axios.get(
    `https://graph.facebook.com/me?fields=name,gender,location,picture,email&access_token=${data.access_token}`,
  )
  return authenticatedUser
}

export async function signInWithGithub(code: string): Promise<IGithubUser> {
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

  const { data: authenticatedUser } = await axios.get<IGithubUser>(
    `https://api.github.com/user`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return authenticatedUser
}

export async function signInWithGoogle(code: string): Promise<any> {
  const { data: authenticatedUser } = await axios.get<IGoogleUser>(
    `https://www.googleapis.com/oauth2/v3/userinfo`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${code}`,
      },
    },
  )

  return authenticatedUser
}
