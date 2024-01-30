import { useQuery } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'
import { getAuthenticatedUser } from '../../service/auth.service'
import { AuthContext } from './context'
import useAuthModal from './useAuthModal'
import { AuthContextType } from './AuthContextType'

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['getProfileData'],
    queryFn: getAuthenticatedUser,
  })

  const { authModal, toggleAuthModal } = useAuthModal()

  const values: AuthContextType = {
    isPending,
    error,
    user: data?.data.data,
    authModal,
    toggleAuthModal,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthProvider
