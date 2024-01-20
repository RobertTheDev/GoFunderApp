import { CreateDonationSchemaType } from "../validators/createDonation.schema";
import { UpdateDonationSchemaType } from "../validators/updateDonation.schema";
import {
  DonationApiResponse,
  DonationsApiResponse,
} from "../../../interfaces/Donation";
import axios from "axios";

const donationApiUrl: string = `${process.env.REACT_APP_API_URL}/donations`;

export async function createdonation(
  data: CreateDonationSchemaType
): Promise<DonationApiResponse> {
  return await axios.post(`${donationApiUrl}/create`, data);
}

export async function deleteDonationById(
  donationId: string
): Promise<DonationApiResponse> {
  return await axios.delete(`${donationApiUrl}/${donationId}`);
}

export async function getDonations(): Promise<DonationsApiResponse> {
  return await axios.get(`${donationApiUrl}`);
}

export async function getDonationById(
  donationId: string
): Promise<DonationApiResponse> {
  return await axios.get(`${donationApiUrl}/${donationId}`);
}

export async function updateDonationById(
  donationId: string,
  data: UpdateDonationSchemaType
): Promise<DonationApiResponse> {
  return await axios.put(`${donationApiUrl}/${donationId}`, data);
}
