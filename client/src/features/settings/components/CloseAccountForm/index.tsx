import { ReactElement } from 'react'
import useCloseAccountForm from './useCloseAccountForm'

export default function CloseAccountForm(): ReactElement {
  const { errors, handleCloseAccount, message, register } =
    useCloseAccountForm()

  return (
    <form onSubmit={handleCloseAccount}>
      <label htmlFor='confirmDeletion'>Confirm Deletion</label>
      <input
        {...register('confirmDeletion')}
        type='text'
        name='confirmDeletion'
      />
      {errors.confirmDeletion?.message && (
        <p>{errors.confirmDeletion?.message}</p>
      )}

      {message && <p>{message.content}</p>}

      <button type='submit'>Close Account</button>
    </form>
  )
}
