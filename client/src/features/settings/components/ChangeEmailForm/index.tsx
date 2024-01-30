import { ReactElement } from 'react'
import useChangeEmail from './useChangeEmail'

export default function ChangeEmailForm(): ReactElement {
  const { errors, handleChangeEmail, message, register } = useChangeEmail()

  return (
    <form onSubmit={handleChangeEmail}>
      <label htmlFor='email'>Email</label>
      <input {...register('email')} type='email' name='email' />
      {errors.email?.message && <p>{errors.email?.message}</p>}
      <label htmlFor='password'>Password</label>
      <input {...register('password')} type='password' name='password' />
      {errors.password?.message && <p>{errors.password?.message}</p>}

      {message && <p>{message.content}</p>}

      <button type='submit'>Change Email</button>
    </form>
  )
}
