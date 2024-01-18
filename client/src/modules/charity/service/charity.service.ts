import axios, { AxiosResponse } from "axios";
import ICharity from "../../../interfaces/Charity";
import { CreateCharitySchemaType } from "../validators/createCharity.schema";

interface ApiResponse {
  success: boolean;
  status: string;
  data: ICharity;
  message: string;
}

export async function createCharity(
  data: CreateCharitySchemaType
): Promise<AxiosResponse<ApiResponse>> {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/charities/create`,
    data,
    {
      withCredentials: true,
    }
  );
}

export async function deleteCharityById(
  charityId: string | undefined
): Promise<ICharity | null> {
  if (!charityId) {
    return null;
  }

  const charity = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/charities/${charityId}`
  );

  if (!charity) {
    return null;
  }

  return charity.data.data;
}

export async function getCharities(): Promise<ICharity[]> {
  const charities = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/charities`
  );

  return charities.data.data;
}

export async function getCharityById(
  charityId: string | undefined
): Promise<ICharity | null> {
  if (!charityId) {
    return null;
  }

  const charity = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/charities/${charityId}`
  );

  if (!charity) {
    return null;
  }

  return charity.data.data;
}

export async function updateCharityById(
  id: string,
  data: any
): Promise<ICharity> {
  const updatedCharity = await axios.put(
    `${process.env.REACT_APP_API_URL}/api/charities/${id}/update`,
    data,
    {
      withCredentials: true,
    }
  );

  return updatedCharity.data.data;
}
