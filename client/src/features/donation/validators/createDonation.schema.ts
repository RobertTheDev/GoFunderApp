import z from 'zod'

const createDonationSchema = z.object({
  amount: z
    .number({
      invalid_type_error: 'Amount must be of type integer.',
      required_error: 'Amount is required.',
    })
    .min(1, 'Amount is required.'),

  message: z
    .string({
      invalid_type_error: 'Message must be of type string.',
    })
    .min(1, 'Message cannot be empty.'),
})

export default createDonationSchema

export type CreateDonationSchemaType = z.infer<typeof createDonationSchema>
