import axios from 'axios'
import type { AccessTokenResponse, IAmazonUser } from './oauth.models'

export async function signInWithAmazon(code: string): Promise<IAmazonUser> {
  const { data } = await axios.post<AccessTokenResponse>(
    `https://api.amazon.co.uk/auth/o2/token?grant_type=authorization_code&code=${code}&client_secret=${process.env.AMAZON_CLIENT_SECRET}&client_id=${process.env.AMAZON_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/amazon/callback`,
  )

  const { data: authenticatedUser } = await axios.get<IAmazonUser>(
    `https://api.amazon.com/user/profile?access_token=${data.access_token}`,
  )

  return authenticatedUser
}
