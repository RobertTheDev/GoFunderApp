import type ICharityOwner from './CharityOwner'
import type IDonation from './Donation'
import type ISavedFundraiser from './SavedFundraiser'

export default interface IUser {
  id: string
  createdAt: Date
  updatedAt: Date
  annonymous: boolean
  avatarUrl: string | null
  charitiesOwned: ICharityOwner[]
  defaultCurrency: string
  donations: IDonation[]
  email: string | null
  emailVerified: Date | null
  mfaSecret: string | null
  mfaType: string | null
  name: string
  password: string | null
  savedFundraisers: ISavedFundraiser[]
  totalCharitesOwned: number
  totalDonationsAmount: number
  totalDonationsMade: number
  totalFundraisersOwned: number
  username: string
}
