import IFundraiser from "./Fundraiser";

export default interface IFundraiserOwner {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fundraiserId: string;
  userId: string;
  fundraiser: IFundraiser;
}
