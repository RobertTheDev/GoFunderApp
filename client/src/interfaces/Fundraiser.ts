import IDonation from "./Donation";

export default interface IFundraiser {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  category: string;
  charityId: string;
  deadlineDate: Date;
  defaultCurrency: string;
  description: string;
  donations: IDonation[];
  headline: string;
  image: string;
  name: string;
  slug: string;
  target: number;
  totalDonations: number;
  totalRaised: number;
  userId: string;
}
