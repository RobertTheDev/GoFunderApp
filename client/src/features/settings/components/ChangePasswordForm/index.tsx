import { ReactElement } from 'react'
import useChangePassword from './useChangePassword'

export default function ChangePasswordForm(): ReactElement {
  const { errors, handleChangePassword, message, register } =
    useChangePassword()

  return (
    <form onSubmit={handleChangePassword}>
      <label htmlFor='currentPassword'>Current Password</label>
      <input
        {...register('currentPassword')}
        type='password'
        name='currentPassword'
      />
      {errors.currentPassword?.message && (
        <p>{errors.currentPassword?.message}</p>
      )}
      <label htmlFor='newPassword'>New Password</label>
      <input {...register('newPassword')} type='password' name='newPassword' />
      {errors.newPassword?.message && <p>{errors.newPassword?.message}</p>}

      {message && <p>{message.content}</p>}

      <button type='submit'>Change Password</button>
    </form>
  )
}
