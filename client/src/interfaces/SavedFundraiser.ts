import ApiResponse from './ApiResponse'
import IFundraiser from './Fundraiser'
import IUser from './User'

export default interface ISavedFundraiser {
  id: string
  createdAt: Date
  updatedAt: Date
  fundraiser: IFundraiser
  fundraiserId: string
  user: IUser
  userId: string
}

export interface SavedFundraiserApiResponse extends ApiResponse {
  data: ISavedFundraiser | null
}

export interface SavedFundraisersApiResponse extends ApiResponse {
  data: ISavedFundraiser[]
}
