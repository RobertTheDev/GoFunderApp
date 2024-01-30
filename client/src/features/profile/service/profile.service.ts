import axios, { AxiosResponse } from 'axios';
import ApiResponse from '../../../interfaces/ApiResponse.js';
import { EditProfileSchemaType } from '../validators/editProfile.schema.js';
import IProfile from '../../../interfaces/Profile.js';

interface ProfileApiResponse extends ApiResponse {
  data: IProfile | null;
}

const profileApiUrl: string = `${process.env.REACT_APP_API_URL}/profile`;

export async function updateProfile(
  data: EditProfileSchemaType
): Promise<AxiosResponse<ProfileApiResponse>> {
  return await axios.put(`${profileApiUrl}/update-profile`, data, {
    withCredentials: true
  });
}
