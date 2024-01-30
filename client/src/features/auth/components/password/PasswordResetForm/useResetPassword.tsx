import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPassword } from '../../../service/auth.service'

import resetPasswordSchema, {
  ResetPasswordSchemaType,
} from '../../../validators/resetPassword.schema'
import { useSearchParams } from 'react-router-dom'
import { AxiosError } from 'axios'

const useResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const [searchParams] = useSearchParams()

  const code = searchParams.get('code')

  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  const handleResetPasswor = async (data: ResetPasswordSchemaType) => {
    try {
      if (code == null || code === undefined) {
        setMessage({
          type: 'error',
          content: 'No verification code was provded.',
        })

        return
      }
      const resetPassworde = await resetPassword(code, data)

      setMessage({ type: 'success', content: resetPassworde.data.message })

      return resetPassworde
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

  const handleResetPassword = handleSubmit(handleResetPasswor)

  return {
    errors,
    handleResetPassword,
    message,
    register,
  }
}

export default useResetPassword
