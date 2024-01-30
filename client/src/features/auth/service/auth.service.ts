import axios, { AxiosResponse } from 'axios'
import ApiResponse from '../../../interfaces/ApiResponse'
import IUser from '../../../interfaces/User'
import { PasswordSignUpSchemaType } from '../validators/passwordSignUp.schema'
import { PasswordSignInSchemaType } from '../validators/passwordSignIn.schema'
import { ChangePasswordSchemaType } from '../validators/changePassword.schema'
import { SendPasswordResetSchemaType } from '../validators/sendPasswordReset.schema'
import { ResetPasswordSchemaType } from '../validators/resetPassword.schema'

interface UserApiResponse extends ApiResponse {
  data: IUser
}

const apiUrl = String(process.env.REACT_APP_API_URL)

const authUrl = `${apiUrl}/auth`

const authApiRoutes = {
  changePassword: `${authUrl}/change-password`,
  getAuthenticatedUser: `${apiUrl}/profile`,
  resetPassword: (code: string) => `${authUrl}/send-password-reset/${code}`,
  sendPasswordReset: `${authUrl}/send-password-reset`,
  signInWithPassword: `${authUrl}/password/sign-in`,
  signUpWithPassword: `${authUrl}/password/sign-up`,
}

export async function changePassword(
  data: ChangePasswordSchemaType,
): Promise<AxiosResponse<ApiResponse>> {
  return await axios.put(authApiRoutes.changePassword, data, {
    withCredentials: true,
  })
}

export async function getAuthenticatedUser(): Promise<
  AxiosResponse<UserApiResponse>
> {
  return await axios.get(authApiRoutes.getAuthenticatedUser, {
    withCredentials: true,
  })
}

export async function resetPassword(
  code: string,
  data: ResetPasswordSchemaType,
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.put(`${authApiRoutes.resetPassword(code)}`, data, {
    withCredentials: true,
  })
}

export async function sendPasswordReset(
  data: SendPasswordResetSchemaType,
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.post(authApiRoutes.sendPasswordReset, data, {
    withCredentials: true,
  })
}

export async function signInWithPassword(
  data: PasswordSignInSchemaType,
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/password/sign-in`,
    data,
    {
      withCredentials: true,
    },
  )
}

export async function signUpWithPassword(
  data: PasswordSignUpSchemaType,
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.post(authApiRoutes.signUpWithPassword, data, {
    withCredentials: true,
  })
}
