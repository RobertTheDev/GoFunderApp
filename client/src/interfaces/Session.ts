export default interface ISession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expires: Date;
  sessionId: string;
  userId: string;
}
