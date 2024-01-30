import ApiResponse from './ApiResponse'
import IDonation from './Donation'
import ISavedFundraiser from './SavedFundraiser'

export default interface IUser {
  id: string
  createdAt: Date
  updatedAt: Date
  annonymous: boolean
  avatarUrl: string | null
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

export interface UserApiResponse extends ApiResponse {
  data: IUser | null
}

export interface UsersApiResponse extends ApiResponse {
  data: IUser[]
}
