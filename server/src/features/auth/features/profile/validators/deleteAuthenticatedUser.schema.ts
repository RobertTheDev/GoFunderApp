import { z } from 'zod'

export const deleteAuthenticatedUserSchema = z.object({
  confirmDeletion: z
    .string({
      invalid_type_error: 'Delete confirmation must be a string.',
      required_error: 'You must type DELETE to complete this action.',
    })
    .min(1, 'You must type DELETE to complete this action.')
    .refine(value => value === 'DELETE', {
      message: 'You must type DELETE to complete this action.',
    }),
})

export default deleteAuthenticatedUserSchema
