import IFundraiser from "./Fundraiser";

export default interface ICharity {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  category: string;
  description: string;
  fundraisers: IFundraiser[];
  logo: string;
  name: string;
  slug: string | null;
}
