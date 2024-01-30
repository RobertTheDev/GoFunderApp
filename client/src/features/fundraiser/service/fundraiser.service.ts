import axios, { AxiosResponse } from 'axios';
import ApiResponse from '../../../interfaces/ApiResponse';
import IFundraiser from '../../../interfaces/Fundraiser';
import { UpdateFundraiserSchemaType } from '../validators/updateFundraiser.schema';
import { CreateFundraiserSchemaType } from '../validators/createFundraiser.schema';

interface FundraiserApiResponse extends ApiResponse {
  data: IFundraiser | null;
}

interface FundraisersApiResponse extends ApiResponse {
  data: IFundraiser[];
}

const fundraiserApiUrl = `${process.env.REACT_APP_API_URL}/fundraiser`;

export async function createFundraiser(
  data: CreateFundraiserSchemaType
): Promise<AxiosResponse<FundraiserApiResponse>> {
  return await axios.post(`${fundraiserApiUrl}/create`, data, {
    withCredentials: true
  });
}

export async function deleteFundraiserById(
  fundraiserId: string
): Promise<AxiosResponse<FundraiserApiResponse>> {
  return await axios.delete(`${fundraiserApiUrl}/${fundraiserId}`);
}

export async function getFundraisers(): Promise<AxiosResponse<FundraisersApiResponse>> {
  return await axios.get(`${fundraiserApiUrl}`);
}

export async function getFundraiserBySlug(
  slug: string
): Promise<AxiosResponse<FundraiserApiResponse>> {
  return await axios.get(`${fundraiserApiUrl}/${slug}`);
}

export async function getFundraisersByCategory(
  fundraiserCategory: string
): Promise<AxiosResponse<FundraisersApiResponse>> {
  return await axios.get(`${fundraiserApiUrl}/category/${fundraiserCategory}`);
}

export async function updateFundraiserBySlug(
  slug: string,
  data: UpdateFundraiserSchemaType
): Promise<AxiosResponse<FundraiserApiResponse>> {
  return await axios.put(`${fundraiserApiUrl}/${slug}`, data);
}
