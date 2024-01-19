import { CreateDonationSchemaType } from "../validators/createDonation.schema";
import { UpdateDonationSchemaType } from "../validators/updateDonation.schema";
import {
  DonationApiResponse,
  DonationsApiResponse,
} from "../../../interfaces/Donation";
import api from "../../../utils/api";

const donationApiUrl: string = `${process.env.REACT_APP_API_URL}/donations`;

export async function createdonation(
  data: CreateDonationSchemaType
): Promise<DonationApiResponse> {
  return await api.post(`${donationApiUrl}/create`, data);
}

export async function deleteDonationById(
  donationId: string
): Promise<DonationApiResponse> {
  return await api.delete(`${donationApiUrl}/${donationId}`);
}

export async function getDonations(): Promise<DonationsApiResponse> {
  return await api.get(`${donationApiUrl}`);
}

export async function getDonationById(
  donationId: string
): Promise<DonationApiResponse> {
  return await api.get(`${donationApiUrl}/${donationId}`);
}

export async function updateDonationById(
  donationId: string,
  data: UpdateDonationSchemaType
): Promise<DonationApiResponse> {
  return await api.put(`${donationApiUrl}/${donationId}`, data);
}
