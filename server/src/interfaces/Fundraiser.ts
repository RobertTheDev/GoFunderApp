import type IDonation from './Donation'
import type IUser from './User'

export default interface IFundraiser {
  id: string
  createdAt: Date
  updatedAt: Date
  category: string
  deadlineDate: Date | null
  defaultCurrency: string
  description: string | null
  donations: IDonation[]
  headline: string
  imageUrl: string
  name: string
  slug: string
  target: number
  totalDonations: number
  totalRaised: number
  user: IUser | null
  userId: string | null
}
