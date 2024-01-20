import ApiResponse from "./ApiResponse";
import IFundraiser from "./Fundraiser";
import IUser from "./User";

export default interface IDonation {
  id: string;
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  amount: number;
  annonymous: boolean;
  currency: string;
  fundraiser: IFundraiser | null;
  fundraiserId: string;
  message: string | null;
  user: IUser | null;
  userId: string;
}

export interface DonationApiResponse extends ApiResponse {
  data: IDonation | null;
}

export interface DonationsApiResponse extends ApiResponse {
  data: IDonation[];
}
