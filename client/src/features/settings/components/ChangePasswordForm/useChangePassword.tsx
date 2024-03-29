import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import changePasswordSchema, {
  ChangePasswordSchemaType,
} from '../../../auth/validators/changePassword.schema'
import { changePassword } from '../../../auth/service/auth.service'
import { AxiosError } from 'axios'

const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  })

  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  const changePasswordHandler = async (data: ChangePasswordSchemaType) => {
    try {
      const deleteProfil = await changePassword(data)

      setMessage({ type: 'success', content: deleteProfil.data.message })

      return deleteProfil
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

  const handleChangePassword = handleSubmit(changePasswordHandler)

  return {
    errors,
    handleChangePassword,
    message,
    register,
  }
}

export default useChangePassword
