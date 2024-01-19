import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../../interfaces/ApiResponse";
import IUser from "../../../interfaces/User";

interface UserApiResponse extends ApiResponse {
  data: IUser;
}

export async function passwordSignUpUser(
  data: any
): Promise<AxiosResponse<UserApiResponse>> {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/auth/sign-up`,
    data,
    {
      withCredentials: true,
    }
  );
}

export async function getAuthenticatedUser() {
  const user = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/auth/user`,
    {
      withCredentials: true,
    }
  );
  return user.data.data;
}
