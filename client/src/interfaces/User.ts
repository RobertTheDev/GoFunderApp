import ICharityFollower from "./CharityFollower";
import ICharityOwner from "./CharityOwner";
import IDonation from "./Donation";
import ISavedFundraiser from "./SavedFundraiser";

export default interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  annonymous: boolean;
  charitiesFollowed: ICharityFollower[];
  charitiesOwned: ICharityOwner[];
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
}
