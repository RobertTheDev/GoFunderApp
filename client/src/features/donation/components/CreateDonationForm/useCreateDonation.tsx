import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import createDonationSchema, {
  CreateDonationSchemaType,
} from '../../validators/createDonation.schema'
import { createdonation } from '../../service/donation.service'
import { AxiosError } from 'axios'

const useCreateDonation = (fundraiserId: string | undefined) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDonationSchemaType>({
    resolver: zodResolver(createDonationSchema),
  })

  const [message, setMessage] = useState<{
    type: string
    content: string
  } | null>(null)

  const createDonation = async (data: CreateDonationSchemaType) => {
    try {
      if (fundraiserId === undefined) {
        return
      }

      const createDsonation = await createdonation(fundraiserId, data)

      setMessage({ type: 'success', content: createDsonation.message })

      return createDsonation
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

  const handleCreateDonation = handleSubmit(createDonation)

  return {
    errors,
    handleCreateDonation,
    message,
    register,
  }
}

export default useCreateDonation
