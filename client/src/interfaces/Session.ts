import ApiResponse from "./ApiResponse";
import IUser from "./User";

export default interface ISession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expires: Date | null;
  sessionId: string;
  user: IUser;
  userId: string;
}

export interface SessionApiResponse extends ApiResponse {
  data: ISession | null;
}

export interface SessionsApiResponse extends ApiResponse {
  data: ISession[];
}
