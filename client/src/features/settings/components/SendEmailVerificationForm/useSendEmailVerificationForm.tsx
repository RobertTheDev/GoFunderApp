import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { sendEmailVerification } from '../../service/settings.service'
import sendEmailVerificationSchema, {
  SendEmailVerificationSchemaType,
} from '../../validators/sendEmailVerification.schema'

const useSendEmailVerificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendEmailVerificationSchemaType>({
    resolver: zodResolver(sendEmailVerificationSchema),
  })

  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  const sendEmailVerificationHandler = async (
    data: SendEmailVerificationSchemaType,
  ) => {
    try {
      const response = await sendEmailVerification(data)

      setMessage({ type: 'success', content: response.data.message })

      return response
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

  const handleSendEmailVerification = handleSubmit(sendEmailVerificationHandler)

  return {
    errors,
    handleSendEmailVerification,
    message,
    register,
  }
}

export default useSendEmailVerificationForm
