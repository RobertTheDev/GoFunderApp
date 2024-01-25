import ApiResponse from "./ApiResponse";

export default interface IVerificationRequest {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expires: Date;
  identifier: string;
  token: string;
}

export interface VerificationRequestApiResponse extends ApiResponse {
  data: IVerificationRequest | null;
}

export interface VerificationRequestsApiResponse extends ApiResponse {
  data: IVerificationRequest[];
}
