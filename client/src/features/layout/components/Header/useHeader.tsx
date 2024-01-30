import { useContext, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDarkMode, useOnClickOutside } from 'usehooks-ts'
import { AuthContext } from '../../../auth/contexts/AuthContext/context'

export default function useHeader() {
  const profileMenuRef = useRef(null)

  const { authModal, toggleAuthModal, user } = useContext(AuthContext)

  const { isDarkMode, toggle } = useDarkMode()

  const [profileMenuActive, setProfileMenuActive] = useState(false)

  function closeProfileMenu() {
    setProfileMenuActive(false)
  }

  useOnClickOutside(profileMenuRef, closeProfileMenu)

  const { pathname } = useLocation()

  return {
    pathname,
    user,
    isDarkMode,
    toggle,
    profileMenuActive,
    profileMenuRef,
    setProfileMenuActive,
    authModal,
    toggleAuthModal,
  }
}
