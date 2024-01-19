import { AxiosResponse } from "axios";

export default interface ApiResponse extends AxiosResponse {
  success: boolean;
  status: number;
  message: string;
}
