import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import passwordSignInSchema, {
  PasswordSignInSchemaType,
} from '../../../validators/passwordSignIn.schema'

const usePasswordSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSignInSchemaType>({
    resolver: zodResolver(passwordSignInSchema),
  })

  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  const signIn = async (data: PasswordSignInSchemaType) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/password/sign-in`,
        data,
        {
          withCredentials: true,
        },
      )
      window.location.reload()
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

  const handleSignIn = handleSubmit(signIn)

  return {
    register,
    handleSignIn,
    errors,
    message,
  }
}

export default usePasswordSignInForm
