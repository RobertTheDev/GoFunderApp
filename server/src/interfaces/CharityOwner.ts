import type ICharity from './Charity'
import type IUser from './User'

export default interface ICharityOwner {
  id: string
  createdAt: Date
  updatedAt: Date
  charity: ICharity
  charityId: string
  user: IUser
  userId: string
}
