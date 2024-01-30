import { ReactElement, useContext, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import { AuthContext } from '../../../auth/contexts/AuthContext/context'
import { FaRegHeart, FaRegMoon, FaRegSun } from 'react-icons/fa6'
import { PiHandHeartBold } from 'react-icons/pi'
import ProfileMenu from '../../../profile/components/ProfileMenu'
import { useDarkMode, useOnClickOutside } from 'usehooks-ts'

export default function Header(): ReactElement {
  const profileMenuRef = useRef(null)

  const { authModal, toggleAuthModal, user } = useContext(AuthContext)

  const { isDarkMode, toggle } = useDarkMode()

  const [profileMenuActive, setProfileMenuActive] = useState(false)

  function closeProfileMenu() {
    setProfileMenuActive(false)
  }

  useOnClickOutside(profileMenuRef, closeProfileMenu)

  const { pathname } = useLocation()

  const headerLinks = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Find Fundraisers',
      path: '/fundraisers',
    },
    {
      name: 'Start Fundraising',
      path: '/start-fundraising',
    },
  ]

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <Link to={'/'} className={styles.headerLogo}>
          GoFunder
        </Link>

        {headerLinks.map((headerLink) => {
          return (
            <Link
              key={headerLink.path}
              className={
                pathname === headerLink.path
                  ? styles.headerLinkActive
                  : styles.headerLink
              }
              to={headerLink.path}
            >
              {headerLink.name}
            </Link>
          )
        })}
      </div>
      <div className={styles.headerRight}>
        {user ? (
          <div className={styles.headerUserContainer}>
            <Link to={'/saved-fundraisers'}>
              <FaRegHeart className={styles.headerIcon} />
            </Link>
            {isDarkMode ? (
              <FaRegSun className={styles.headerIcon} onClick={toggle} />
            ) : (
              <FaRegMoon className={styles.headerIcon} onClick={toggle} />
            )}
            <Link to={'/donations'}>
              <PiHandHeartBold className={styles.headerIcon} />
            </Link>
            <div className={styles.headerAvatarContainer}>
              <input
                type='image'
                onClick={() => setProfileMenuActive(!profileMenuActive)}
                src={
                  user.avatarUrl
                    ? user.avatarUrl
                    : 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg'
                }
                alt='Avatar'
              />
            </div>

            {profileMenuActive && <ProfileMenu ref={profileMenuRef} />}
          </div>
        ) : (
          <div>
            <button
              type='button'
              className={styles.headerAuthButton}
              onClick={() => toggleAuthModal(!authModal.active, 'signIn')}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
