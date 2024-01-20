import axios, { AxiosResponse } from "axios";
import ApiResponse from "../../../interfaces/ApiResponse";
import { FollowCharitySchemaType } from "../validators/followCharity.schema";
import ICharityFollower from "../../../interfaces/CharityFollower";

interface CharityFollowerApiResponse extends ApiResponse {
  data: ICharityFollower[];
}

const charityFollowerApiUrl: string = `${process.env.REACT_APP_API_URL}/charity-followers`;

export async function followCharity(
  data: FollowCharitySchemaType
): Promise<AxiosResponse<CharityFollowerApiResponse>> {
  return await axios.post(`${charityFollowerApiUrl}/follow`, data);
}
