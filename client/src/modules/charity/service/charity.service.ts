import axios, { AxiosResponse } from "axios";
import ICharity from "../../../interfaces/Charity";
import { CreateCharitySchemaType } from "../validators/createCharity.schema";
import { UpdateCharitySchemaType } from "../validators/updateCharity.schema";
import ApiResponse from "../../../interfaces/ApiResponse";

interface CharityApiResponse extends ApiResponse {
  data: ICharity | null;
}

interface CharitiesApiResponse extends ApiResponse {
  data: ICharity[];
}

axios.defaults.withCredentials = true;

const charityApiUrl: string = `${process.env.REACT_APP_API_URL}/charities`;

export async function createCharity(
  data: CreateCharitySchemaType
): Promise<AxiosResponse<CharityApiResponse>> {
  return await axios.post(`${charityApiUrl}/create`, data);
}

export async function deleteCharityById(
  charityId: string
): Promise<AxiosResponse<CharityApiResponse>> {
  return await axios.delete(`${charityApiUrl}/${charityId}`);
}

export async function getCharities(): Promise<
  AxiosResponse<CharitiesApiResponse>
> {
  return await axios.get(`${charityApiUrl}`);
}

export async function getCharityById(
  charityId: string
): Promise<AxiosResponse<CharityApiResponse>> {
  return await axios.get(`${charityApiUrl}/${charityId}`);
}

export async function updateCharityById(
  charityId: string,
  data: UpdateCharitySchemaType
): Promise<AxiosResponse<CharityApiResponse>> {
  return await axios.put(`${charityApiUrl}/${charityId}`, data);
}
