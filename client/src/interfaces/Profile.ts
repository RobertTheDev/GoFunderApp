import ApiResponse from './ApiResponse'

export default interface IProfile {
  id: string
  createdAt: Date
  avatarUrl: string | null
  annonymous: boolean
  defaultCurrency: string
  email: string | null
  emailVerified: Date | null
  mfaType: string | null
  name: string
  totalCharitesOwned: number
  totalDonationsAmount: number
  totalDonationsMade: number
  totalFundraisersOwned: number
  username: string
}

export interface ProfileApiResponse extends ApiResponse {
  data: IProfile | null
}

export interface ProfilesApiResponse extends ApiResponse {
  data: IProfile[]
}
