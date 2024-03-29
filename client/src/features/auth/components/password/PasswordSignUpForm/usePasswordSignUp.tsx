import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import passwordSignUpSchema, {
  PasswordSignUpSchemaType,
} from '../../../validators/passwordSignUp.schema'
import { signUpWithPassword } from '../../../service/auth.service'
import { AxiosError } from 'axios'

const usePasswordSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSignUpSchemaType>({
    resolver: zodResolver(passwordSignUpSchema),
  })

  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  const passwordSignUp = async (data: PasswordSignUpSchemaType) => {
    try {
      const signUp = await signUpWithPassword(data)

      setMessage({ type: 'success', content: signUp.data.message })

      window.location.reload()

      return signUp
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

  const handlePasswordSignUp = handleSubmit(passwordSignUp)

  return {
    errors,
    handlePasswordSignUp,
    message,
    register,
  }
}

export default usePasswordSignUp
