import ApiResponse from "./ApiResponse";
import IFundraiser from "./Fundraiser";
import IUser from "./User";

export default interface IFundraiserOwner {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fundraiser: IFundraiser;
  fundraiserId: string;
  user: IUser;
  userId: string;
}

export interface FundraiserOwnerApiResponse extends ApiResponse {
  data: IFundraiserOwner | null;
}

export interface FundraiserOwnersApiResponse extends ApiResponse {
  data: IFundraiserOwner[];
}
