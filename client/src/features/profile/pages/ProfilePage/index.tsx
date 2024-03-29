import Seo from '../../../common/Seo'
import { useQuery } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { getAuthenticatedUser } from '../../../auth/service/auth.service'
import { Navigate } from 'react-router-dom'

export default function ProfilePage(): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ['getProfileData'],
    queryFn: getAuthenticatedUser,
  })

  if (isPending) return <p>Loading...</p>

  if (data === null || data?.data.data === null || error) {
    return <Navigate to={'/unauthenticated'} />
  }

  const { email, avatarUrl } = data.data.data

  return (
    <>
      <Seo
        title={'Profile'}
        description={`
        This page displays your account profile information 
        and data including your email address, name, 
        and avatar image. Your private information 
        will not be displayed.
      `}
      />
      <div>
        <p>{email}</p>

        <img src={avatarUrl ? avatarUrl : ''} alt='Avatart' />
      </div>
    </>
  )
}
