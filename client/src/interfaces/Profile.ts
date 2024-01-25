import ApiResponse from "./ApiResponse";
import IDonation from "./Donation";
import ISavedFundraiser from "./SavedFundraiser";

export default interface IProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  annonymous: boolean;
  defaultCurrency: string;
  donations: IDonation[];
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  mfaSecret: string | null;
  mfaType: string | null;
  name: string;
  password: string | null;
  phoneNumber: string | null;
  phoneNumberVerified: string | null;
  savedFundraisers: ISavedFundraiser[];
  totalCharitesOwned: number;
  totalDonationsAmount: number;
  totalDonationsMade: number;
  totalFundraisersOwned: number;
  username: string;
}

export interface ProfileApiResponse extends ApiResponse {
  data: IProfile | null;
}

export interface ProfilesApiResponse extends ApiResponse {
  data: IProfile[];
}
