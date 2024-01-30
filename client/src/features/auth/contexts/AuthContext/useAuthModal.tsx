import { useState } from 'react'
import { IAuthModal } from './AuthContextType'

export default function useAuthModal() {
  const [authModal, setAuthModal] = useState<IAuthModal>({
    active: false,
    formType: null,
  })

  const toggleAuthModal: (active: boolean, formType: string | null) => void = (
    active,
    formType,
  ) => {
    setAuthModal({
      active,
      formType: formType || null,
    })
  }

  return { authModal, setAuthModal, toggleAuthModal }
}
