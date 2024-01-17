export default interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  annonymous: boolean;
  defaultCurrency: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  mfaSecret: string | null;
  mfaType: string | null;
  name: string;
  password: string | null;
  phoneNumber: string | null;
  phoneNumberVerified: string | null;
  totalCharitesOwned: number;
  totalDonationsAmount: number;
  totalDonationsMade: number;
  totalFundraisersOwned: number;
}
