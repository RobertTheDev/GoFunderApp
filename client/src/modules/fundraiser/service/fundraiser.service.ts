import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../../interfaces/ApiResponse";
import IFundraiser from "../../../interfaces/Fundraiser";
import { CreateCharityFundraiserSchemaType } from "../validators/createCharityFundraiser.schema";
import { CreateUserFundraiserSchemaType } from "../validators/createUserFundraiser.schema";
import { UpdateFundraiserSchemaType } from "../validators/updateFundraiser.schema";

interface FundraiserApiResponse extends ApiResponse {
  data: IFundraiser | null;
}

interface FundraisersApiResponse extends ApiResponse {
  data: IFundraiser[];
}

axios.defaults.withCredentials = true;

const fundraiserApiUrl: string = `${process.env.REACT_APP_API_URL}/fundraisers`;

export async function createCharityFundraiser(
  data: CreateCharityFundraiserSchemaType
): Promise<AxiosResponse<FundraiserApiResponse>> {
  return await axios.post(`${fundraiserApiUrl}/create`, data);
}

export async function createUserFundraiser(
  data: CreateUserFundraiserSchemaType
): Promise<AxiosResponse<FundraiserApiResponse>> {
  return await axios.post(`${fundraiserApiUrl}/create`, data);
}

export async function deleteFundraiserById(
  fundraiserId: string
): Promise<AxiosResponse<FundraiserApiResponse>> {
  return await axios.delete(`${fundraiserApiUrl}/${fundraiserId}`);
}

export async function getFundraisers(): Promise<
  AxiosResponse<FundraisersApiResponse>
> {
  return await axios.get(`${fundraiserApiUrl}`);
}

export async function getFundraiserById(
  fundraiserId: string
): Promise<AxiosResponse<FundraiserApiResponse>> {
  return await axios.get(`${fundraiserApiUrl}/${fundraiserId}`);
}

export async function updateFundraiserById(
  fundraiserId: string,
  data: UpdateFundraiserSchemaType
): Promise<AxiosResponse<FundraiserApiResponse>> {
  return await axios.put(`${fundraiserApiUrl}/${fundraiserId}`, data);
}
