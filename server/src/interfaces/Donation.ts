import type IFundraiser from './Fundraiser'
import type IUser from './User'

export default interface IDonation {
  id: string
  createdAt: Date
  updatedAt: Date
  amount: number
  currency: string
  fundraiser: IFundraiser | null
  fundraiserId: string
  message: string | null
  user: IUser | null
  userId: string
}
