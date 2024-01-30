import axios, { AxiosResponse } from 'axios'
import ApiResponse from '../../../interfaces/ApiResponse'
import ISavedFundraiser from '../../../interfaces/SavedFundraiser'
import { SaveFundraiserSchemaType } from '../validators/saveFundraiser.schema'

interface SavedFundraiserApiResponse extends ApiResponse {
  data: ISavedFundraiser | null
}

interface SavedFundraisersApiResponse extends ApiResponse {
  data: ISavedFundraiser[]
}

const savedFundraiserApiUrl = `${process.env.REACT_APP_API_URL}/saved-fundraiser`

export async function getSavedFundraisers(): Promise<
  AxiosResponse<SavedFundraisersApiResponse>
> {
  return await axios.get(`${savedFundraiserApiUrl}`, { withCredentials: true })
}

export async function saveFundraiser(
  data: SaveFundraiserSchemaType,
): Promise<AxiosResponse<SavedFundraiserApiResponse>> {
  return await axios.post(
    `${savedFundraiserApiUrl}/save/${data.fundraiserId}`,
    {},
    { withCredentials: true },
  )
}
