import { ReactElement } from 'react'
import useEditProfile from './useEditProfile'

export default function EditProfileForm(): ReactElement {
  const { errors, handleEditProfile, message, register } = useEditProfile()

  return (
    <div>
      <form onSubmit={handleEditProfile}>
        <label htmlFor='name'>Name</label>
        <input {...register('name')} type='text' name='name' />
        {errors.name?.message && <p>{errors.name.message}</p>}

        {message && <p>{message.content}</p>}

        <button type='submit'>Update Profile</button>
      </form>
    </div>
  )
}
