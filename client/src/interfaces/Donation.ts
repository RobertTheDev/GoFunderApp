import ApiResponse from "./ApiResponse";

export default interface IDonation {
  amount: number;
  annonymous: boolean;
  fundraiserId: string;
  message: string;
}

export interface DonationApiResponse extends ApiResponse {
  data: IDonation | null;
}

export interface DonationsApiResponse extends ApiResponse {
  data: IDonation[];
}
