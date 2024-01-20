import ApiResponse from "./ApiResponse";
import IUser from "./User";

export default interface IDonation {
  id: string;
  createdAt: Date;
  amount: number;
  message: string;
  user: IUser;
}

export interface DonationApiResponse extends ApiResponse {
  data: IDonation | null;
}

export interface DonationsApiResponse extends ApiResponse {
  data: IDonation[];
}
