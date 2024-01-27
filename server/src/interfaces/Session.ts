import type IUser from './User'

export default interface ISession {
  id: string
  createdAt: Date
  updatedAt: Date
  expires: Date | null
  mfaVerified: Date | null
  sessionId: string
  user: IUser
  userId: string
}
