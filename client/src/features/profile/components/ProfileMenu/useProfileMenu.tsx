import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export default function useProfileMenu() {
  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  async function signOut(): Promise<void> {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/session/sign-out`,
        {},
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

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfileData'] })
    },
    onError: () => {
      console.log('error')
    },
  })

  return { message, mutation }
}
