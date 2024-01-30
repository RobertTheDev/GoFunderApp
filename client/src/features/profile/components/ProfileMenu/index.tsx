import { ForwardedRef, forwardRef } from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import profileMenuLinks from '../../../../utils/profileMenuLinks'
import useProfileMenu from './useProfileMenu'

const ProfileMenu = forwardRef(function ProfileMenu(
  _props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { message, mutation } = useProfileMenu()

  return (
    <div className={styles.profileMenuContainer} ref={ref}>
      <div className={styles.profileMenuLinksContainer}>
        {profileMenuLinks.map((profileMenuLink) => {
          return (
            <Link
              className={styles.profileMenuLink}
              key={profileMenuLink.path}
              to={profileMenuLink.path}
            >
              {profileMenuLink.name}
            </Link>
          )
        })}
      </div>
      <button type='button' onClick={() => mutation.mutate()}>
        Sign Out
      </button>
      {message && <p>{message.content}</p>}
    </div>
  )
})

export default ProfileMenu
