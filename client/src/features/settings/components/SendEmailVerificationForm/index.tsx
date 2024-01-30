import { ReactElement } from 'react'
import useSendEmailVerificationForm from './useSendEmailVerificationForm'

export default function SendEmailVerificationForm(): ReactElement {
  const { errors, handleSendEmailVerification, message, register } =
    useSendEmailVerificationForm()

  return (
    <form onSubmit={handleSendEmailVerification}>
      <label htmlFor='email'>Email</label>
      <input {...register('email')} type='email' name='email' />
      {errors.email?.message && <p>{errors.email?.message}</p>}

      {message && <p>{message.content}</p>}

      <button type='submit'>Send Email Verification</button>
    </form>
  )
}
