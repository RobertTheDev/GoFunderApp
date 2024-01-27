import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../../interfaces/ApiResponse";
import IUser from "../../../interfaces/User";
import { PasswordSignUpSchemaType } from "../validators/passwordSignUp.schema";
import { PasswordSignInSchemaType } from "../validators/passwordSignIn.schema";
import { ChangePasswordSchemaType } from "../validators/changePassword.schema";
import { SendPasswordResetSchemaType } from "../validators/sendPasswordReset.schema";
import { ResetPasswordSchemaType } from "../validators/resetPassword.schema";

interface UserApiResponse extends ApiResponse {
  data: IUser;
}

const authUrl: string = `${process.env.REACT_APP_API_URL}/auth`;

export async function resetPassword(
  code: string,
  data: ResetPasswordSchemaType
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.put(`${authUrl}/reset-password/${code}`, data, {
    withCredentials: true,
  });
}

export async function sendPasswordReset(
  data: SendPasswordResetSchemaType
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.post(`${authUrl}/send-password-reset`, data, {
    withCredentials: true,
  });
}

export async function signUpWithPassword(
  data: PasswordSignUpSchemaType
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.post(`${authUrl}/sign-up`, data, {
    withCredentials: true,
  });
}

export async function signInWithPassword(
  data: PasswordSignInSchemaType
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.post(`${authUrl}/sign-in`, data, {
    withCredentials: true,
  });
}

export async function getAuthenticatedUser(): Promise<
  AxiosResponse<UserApiResponse>
> {
  return await axios.get(`${authUrl}/user`, {
    withCredentials: true,
  });
}

export async function changePassword(
  data: ChangePasswordSchemaType
): Promise<AxiosResponse<ApiResponse>> {
  return await axios.put(`${authUrl}/change-password`, data, {
    withCredentials: true,
  });
}
