import { ForwardedRef, forwardRef, useState } from 'react'
import styles from './styles.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Link } from 'react-router-dom'

const ProfileMenu = forwardRef(function ProfileMenu(
  _props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  async function signOut(): Promise<void> {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/session/sign-out`,
        {},
        {
          withCredentials: true,
        },
      )

      window.location.reload()
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMessage({
          type: 'error',
          content: error.response?.data.message,
        })
      } else {
        setMessage({
          type: 'error',
          content: 'Internal server error. Please try again.',
        })
      }
    }
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfileData'] })
    },
    onError: () => {
      console.log('error')
    },
  })

  const profileMenuLinks = [
    {
      name: 'Edit Profile',
      path: '/edit-profile',
    },
    {
      name: 'Settings',
      path: '/settings',
    },
    {
      name: 'Saved Fundraisers',
      path: '/saved-fundraisers',
    },
    {
      name: 'My Donations',
      path: '/donations',
    },
    {
      name: 'My Fundraisers',
      path: '/owned-fundraisers',
    },
  ]

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
