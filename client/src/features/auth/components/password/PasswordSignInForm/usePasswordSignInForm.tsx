import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import passwordSignInSchema, {
  PasswordSignInSchemaType,
} from '../../../validators/passwordSignIn.schema'
import { signInWithPassword } from '../../../service/auth.service'

interface IResponseMessage {
  type: string
  content: string
}

const usePasswordSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSignInSchemaType>({
    resolver: zodResolver(passwordSignInSchema),
  })

  const [message, setMessage] = useState<IResponseMessage | null>(null)

  const signIn = async (data: PasswordSignInSchemaType) => {
    try {
      await signInWithPassword(data)

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
