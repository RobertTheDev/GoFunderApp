import ApiResponse from "./ApiResponse";
import IDonation from "./Donation";
import IFundraiserOwner from "./FundraiserOwner";
import ISavedFundraiser from "./SavedFundraiser";
import ISession from "./Session";

export default interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  annonymous: boolean;
  defaultCurrency: string;
  donations: IDonation[];
  email: string | null;
  emailVerificationToken: string | null;
  emailVerificationTokenExpiry: Date | null;
  emailVerified: Date | null;
  ownedFundraisers: IFundraiserOwner[];
  image: string | null;
  mfaSecret: string | null;
  mfaType: string | null;
  name: string;
  password: string | null;
  passwordResetToken: string | null;
  passwordResetTokenExpiry: Date | null;
  savedFundraisers: ISavedFundraiser[];
  sessions: ISession[];
  totalCharitesOwned: number;
  totalDonationsAmount: number;
  totalDonationsMade: number;
  totalFundraisersOwned: number;
  username: string;
}

export interface UserApiResponse extends ApiResponse {
  data: IUser | null;
}

export interface UsersApiResponse extends ApiResponse {
  data: IUser[];
}
