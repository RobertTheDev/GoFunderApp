import type ICharityFollower from './CharityFollower'
import type ICharityOwner from './CharityOwner'
import type IFundraiser from './Fundraiser'

export default interface ICharity {
  id: string
  createdAt: Date
  updatedAt: Date
  category: string
  charityFollowers: ICharityFollower[]
  charityOwners: ICharityOwner[]
  description: string | null
  fundraisers: IFundraiser[]
  logo: string
  name: string
  slug: string
}
