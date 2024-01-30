import { useContext, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { AuthContextType } from '../../contexts/AuthContext/AuthContextType'
import { AuthContext } from '../../contexts/AuthContext/context'

export default function useModal() {
  const { authModal, toggleAuthModal } =
    useContext<AuthContextType>(AuthContext)

  const authModalRef: React.RefObject<HTMLDivElement> = useRef(null)

  const handleToggleAuthModal: () => void = () => {
    toggleAuthModal(!authModal.active, null)
  }

  useOnClickOutside(authModalRef, handleToggleAuthModal)

  return { authModal, authModalRef, handleToggleAuthModal }
}
