import ICharityFollower from "./CharityFollower";
import ICharityOwner from "./CharityOwner";
import IFundraiser from "./Fundraiser";

export default interface ICharity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  charityFollowers: ICharityFollower[];
  charityOwners: ICharityOwner[];
  description: string | null;
  fundraisers: IFundraiser[];
  logo: string | null;
  name: string;
  slug: string | null;
}
