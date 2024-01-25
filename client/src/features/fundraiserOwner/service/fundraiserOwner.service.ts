import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../../interfaces/ApiResponse";
import IFundraiserOwner from "../../../interfaces/FundraiserOwner";

interface FundraiserOwnersApiResponse extends ApiResponse {
  data: IFundraiserOwner[];
}

const fundraiserApiUrl: string = `${process.env.REACT_APP_API_URL}/fundraiser-owners`;

export async function getFundraiserOwnersByAuthenticatedUser(): Promise<
  AxiosResponse<FundraiserOwnersApiResponse>
> {
  return await axios.get(`${fundraiserApiUrl}/user`, { withCredentials: true });
}
