import { Navigate } from 'react-router-dom'
import { ReactElement, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAuthenticatedUser } from '../../../service/auth.service'

function AuthenticatedRoute({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ['getProfileData'],
    queryFn: getAuthenticatedUser,
  })

  if (isPending) return <p>Loading...</p>

  if (data === null || data?.data.data === null || error) {
    return <Navigate to={'/unauthenticated'} />
  }

  return <>{children}</>
}

export default AuthenticatedRoute
