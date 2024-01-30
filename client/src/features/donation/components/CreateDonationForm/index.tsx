import { ReactElement } from 'react'
import useCreateDonation from './useCreateDonation'

export default function CreateDonationForm({
  fundraiserId,
}: {
  fundraiserId: string
}): ReactElement {
  const { errors, handleCreateDonation, message, register } =
    useCreateDonation(fundraiserId)

  return (
    <div>
      <form onSubmit={handleCreateDonation}>
        <p>{fundraiserId}</p>
        <label htmlFor='amount'>Amount</label>
        <input
          {...register('amount', { valueAsNumber: true })}
          type='number'
          name='amount'
        />
        {errors.amount?.message && <p>{errors.amount.message}</p>}

        <label htmlFor='message'>Message</label>
        <input {...register('message')} type='text' name='message' />
        {errors.message?.message && <p>{errors.message.message}</p>}

        {message && <p>{message.content}</p>}

        <button type='submit'>Donate</button>
      </form>
    </div>
  )
}
