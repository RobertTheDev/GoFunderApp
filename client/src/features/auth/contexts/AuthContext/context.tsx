import { createContext } from 'react'
import { AuthContextType } from './AuthContextType'

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: false,
  error: null,
  authModal: { active: false, formType: null },
  toggleAuthModal: (active: boolean, formType: string | null) => {
    return { active, formType }
  },
})
