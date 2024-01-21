import type ICharityFollower from './CharityFollower'
import type ICharityOwner from './CharityOwner'
import type IDonation from './Donation'
import type ISavedFundraiser from './SavedFundraiser'

export default interface IProfile {
  id: string
  createdAt: Date
  updatedAt: Date
  annonymous: boolean
  charitiesFollowed: ICharityFollower[]
  charitiesOwned: ICharityOwner[]
  defaultCurrency: string
  donations: IDonation[]
  email: string | null
  emailVerified: Date | null
  image: string | null
  mfaSecret: string | null
  mfaType: string | null
  name: string
  password: string | null
  phoneNumber: string | null
  phoneNumberVerified: string | null
  savedFundraisers: ISavedFundraiser[]
  totalCharitesOwned: number
  totalDonationsAmount: number
  totalDonationsMade: number
  totalFundraisersOwned: number
  username: string
}
