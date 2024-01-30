import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import changeEmailSchema, {
  ChangeEmailSchemaType,
} from '../../validators/changeEmail.schema'
import { changeEmail } from '../../service/settings.service'

const useChangeEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeEmailSchemaType>({
    resolver: zodResolver(changeEmailSchema),
  })

  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  const changeEmailHandler = async (data: ChangeEmailSchemaType) => {
    try {
      const response = await changeEmail(data)

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

  const handleChangeEmail = handleSubmit(changeEmailHandler)

  return {
    errors,
    handleChangeEmail,
    message,
    register,
  }
}

export default useChangeEmail
