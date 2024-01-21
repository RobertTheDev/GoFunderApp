export interface AccessTokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

export interface IAmazonUser {
  user_id: string
  email: string
  name: string
  postal_code: string
}
