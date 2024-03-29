import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import verifyTotpCodeSchema, {
  VerifyTotpCodeSchemaType,
} from '../../../validators/verifyTotpCode.schema'

const useTotpSetupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyTotpCodeSchemaType>({
    resolver: zodResolver(verifyTotpCodeSchema),
  })

  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  const handleTotpVerification = async (data: VerifyTotpCodeSchemaType) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/totp/verify-code`,
        data,
        {
          withCredentials: true,
        },
      )
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMessage({
          type: 'error',
          content: error.response?.data.message,
        })
      } else {
        setMessage({
          type: 'error',
          content: 'Internal server error. Please try again.',
        })
      }
    }
  }

  const handleTotpSetup = handleSubmit(handleTotpVerification)

  return {
    register,
    handleTotpSetup,
    errors,
    message,
  }
}

export default useTotpSetupForm
