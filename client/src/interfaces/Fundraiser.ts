import ApiResponse from './ApiResponse';
import IDonation from './Donation';
import IFundraiserOwner from './FundraiserOwner';
import IUser from './User';

export default interface IFundraiser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  deadlineDate: Date | null;
  defaultCurrency: string;
  description: string | null;
  donations: IDonation[];
  fundraiserOwners: IFundraiserOwner[];
  headline: string;
  imageUrl: string;
  name: string;
  slug: string;
  target: number;
  totalDonations: number;
  totalRaised: number;
  user: IUser | null;
  userId: string | null;
}

export interface FundraiserApiResponse extends ApiResponse {
  data: IFundraiser | null;
}

export interface FundraisersApiResponse extends ApiResponse {
  data: IFundraiser[];
}
