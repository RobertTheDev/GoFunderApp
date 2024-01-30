import axios, { AxiosResponse } from 'axios';
import ApiResponse from '../../../interfaces/ApiResponse';
import IFundraiserOwner from '../../../interfaces/FundraiserOwner';

interface FundraiserOwnersApiResponse extends ApiResponse {
  data: IFundraiserOwner[];
}

interface FundraiserOwnerApiResponse extends ApiResponse {
  data: IFundraiserOwner | null;
}

const fundraiserApiUrl = `${process.env.REACT_APP_API_URL}/fundraiser-owner`;

export async function getFundraiserOwnersByAuthenticatedUser(): Promise<
  AxiosResponse<FundraiserOwnersApiResponse>
> {
  return await axios.get(`${fundraiserApiUrl}/user`, { withCredentials: true });
}

export async function checkFundraiserOwnerByFundraiserSlug(
  slug: string
): Promise<AxiosResponse<FundraiserOwnerApiResponse>> {
  return await axios.get(`${fundraiserApiUrl}/check-fundraiser-owner/${slug}`, {
    withCredentials: true
  });
}
