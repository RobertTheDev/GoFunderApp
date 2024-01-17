import axios, { AxiosResponse } from "axios";

interface ApiResponse {
  success: boolean;
  status: string;
  data: any;
  message: string;
}

export async function passwordSignUpUser(
  data: any
): Promise<AxiosResponse<ApiResponse>> {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/auth/sign-up`,
    data,
    {
      withCredentials: true,
    }
  );
}
