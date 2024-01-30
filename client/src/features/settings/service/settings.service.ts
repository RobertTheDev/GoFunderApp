import axios, { AxiosResponse } from 'axios'
import ApiResponse from '../../../interfaces/ApiResponse'
import { DeleteProfileSchemaType } from '../validators/deleteProfile.schema'
import { ChangeEmailSchemaType } from '../validators/changeEmail.schema'
import { SendEmailVerificationSchemaType } from '../validators/sendEmailVerification.schema'

const apiUrl = `${process.env.REACT_APP_API_URL}`

export async function deleteProfile(
  data: DeleteProfileSchemaType,
): Promise<AxiosResponse<ApiResponse>> {
  return await axios.post(`${apiUrl}/auth/delete`, data, {
    withCredentials: true,
  })
}

export async function changeEmail(
  data: ChangeEmailSchemaType,
): Promise<AxiosResponse<ApiResponse>> {
  return await axios.put(`${apiUrl}/auth/change-email`, data, {
    withCredentials: true,
  })
}

export async function sendEmailVerification(
  data: SendEmailVerificationSchemaType,
): Promise<AxiosResponse<ApiResponse>> {
  return await axios.post(
    `${apiUrl}/auth/password/send-email-verification`,
    data,
    {
      withCredentials: true,
    },
  )
}
