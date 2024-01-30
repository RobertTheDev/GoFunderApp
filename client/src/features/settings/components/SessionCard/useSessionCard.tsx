import { QueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'

const useSessionCard = (sessionId: string) => {
  function deleteSession() {
    return axios.delete(
      `${process.env.REACT_APP_API_URL}/auth/session/${sessionId}`,
      {
        withCredentials: true,
      },
    )
  }

  const queryClient = new QueryClient()

  const mutation = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['getProfileSessions'] })
    },
  })

  return { mutation }
}

export default useSessionCard
