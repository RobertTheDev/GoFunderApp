import z from 'zod'

const createDonationSchema = z.object({
  amount: z
    .number({
      invalid_type_error: 'Amount must be of type integer.',
      required_error: 'Amount is required.',
    })
    .min(1, 'Amount cannot be empty.'),
  annonymous: z
    .boolean({
      invalid_type_error: 'Annonymous must be of type boolean.',
    })
    .optional(),
  message: z
    .string({
      invalid_type_error: 'Message must be of type string.',
      required_error: 'Message is required.',
    })
    .min(1, 'Message cannot be empty.'),
})

export type CreateDonationSchemaType = z.infer<typeof createDonationSchema>

export default createDonationSchema
