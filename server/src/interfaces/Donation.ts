import type IFundraiser from './Fundraiser'
import type IUser from './User'

export default interface IDonation {
  id: string
  createdAt: Date
  deletedAt: Date
  updatedAt: Date
  amount: number
  annonymous: boolean
  currency: string
  fundraiser: IFundraiser | null
  fundraiserId: string
  message: string | null
  user: IUser | null
  userId: string
}
