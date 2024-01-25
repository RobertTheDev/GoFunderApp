import { CreateDonationSchemaType } from "../validators/createDonation.schema";
import IDonation, { DonationApiResponse } from "../../../interfaces/Donation";
import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../../interfaces/ApiResponse";

interface UserDonationsApiResponse extends ApiResponse {
  data: IDonation[];
}

const donationApiUrl: string = `${process.env.REACT_APP_API_URL}/donations`;

export async function createdonation(
  fundraiserId: string,
  data: CreateDonationSchemaType
): Promise<DonationApiResponse> {
  return await axios.post(`${donationApiUrl}/create/${fundraiserId}`, data);
}

export async function deleteDonationById(
  donationId: string
): Promise<DonationApiResponse> {
  return await axios.delete(`${donationApiUrl}/${donationId}`);
}

export async function getDonations(): Promise<UserDonationsApiResponse> {
  return await axios.get(`${donationApiUrl}`);
}

export async function getDonationsByCurrentUser(): Promise<
  AxiosResponse<UserDonationsApiResponse>
> {
  return await axios.get(`${donationApiUrl}/current-user`, {
    withCredentials: true,
  });
}

export async function getDonationById(
  donationId: string
): Promise<DonationApiResponse> {
  return await axios.get(`${donationApiUrl}/${donationId}`);
}
