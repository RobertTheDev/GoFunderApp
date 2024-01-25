import ApiResponse from "./ApiResponse";
import IFundraiser from "./Fundraiser";

export default interface IFundraiserOwner {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fundraiserId: string;
  userId: string;
  fundraiser: IFundraiser;
}

export interface FundraiserOwnerApiResponse extends ApiResponse {
  data: IFundraiserOwner | null;
}

export interface FundraiserOwnersApiResponse extends ApiResponse {
  data: IFundraiserOwner[];
}
