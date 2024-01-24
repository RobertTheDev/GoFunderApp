import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../../interfaces/ApiResponse";
import IUser from "../../../interfaces/User";
import { PasswordSignUpSchemaType } from "../validators/passwordSignUp.schema";
import { PasswordSignInSchemaType } from "../validators/passwordSignIn.schema";
import { ChangePasswordSchemaType } from "../validators/changePassword.schema";

interface UserApiResponse extends ApiResponse {
  data: IUser;
}

export async function signUpWithPassword(
  data: PasswordSignUpSchemaType
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/sign-up`,
    data,
    {
      withCredentials: true,
    }
  );
}

export async function signInWithPassword(
  data: PasswordSignInSchemaType
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/sign-in`,
    data,
    {
      withCredentials: true,
    }
  );
}

export async function getAuthenticatedUser() {
  const user = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, {
    withCredentials: true,
  });
  return user.data.data;
}

export async function changePassword(
  data: ChangePasswordSchemaType
): Promise<AxiosResponse<ApiResponse>> {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/auth/change-password`,
    data,
    {
      withCredentials: true,
    }
  );
}
