export default interface IProfile {
  annonymous: boolean
  createdAt: Date
  defaultCurrency: string
  email: string | null
  emailVerified: Date | null
  image: string | null
  id: string
  mfaType: string | null
  name: string
  totalCharitesOwned: number
  totalDonationsAmount: number
  totalDonationsMade: number
  totalFundraisersOwned: number
  username: string
}
