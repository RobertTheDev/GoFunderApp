import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import editProfileSchema, {
  EditProfileSchemaType,
} from '../../validators/editProfile.schema'
import { updateProfile } from '../../service/profile.service'
import { AxiosError } from 'axios'

const useEditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
  })

  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  const editProfile = async (data: EditProfileSchemaType) => {
    try {
      const editProfil = await updateProfile(data)

      setMessage({ type: 'success', content: editProfil.data.message })

      return editProfil
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

  const handleEditProfile = handleSubmit(editProfile)

  return {
    errors,
    handleEditProfile,
    message,
    register,
  }
}

export default useEditProfile
