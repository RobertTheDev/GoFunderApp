import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../../interfaces/ApiResponse";
import { DeleteProfileSchemaType } from "../validators/deleteProfile.schema";

const apiUrl: string = `${process.env.REACT_APP_API_URL}`;

export async function deleteProfile(
  data: DeleteProfileSchemaType
): Promise<AxiosResponse<ApiResponse>> {
  return await axios.post(`${apiUrl}/auth/delete`, data, {
    withCredentials: true,
  });
}
