import { z } from 'zod'

export const updateUserSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First name must be of type string.',
    })
    .min(1, 'First name  cannot be empty.')
    .optional(),
  lastName: z
    .string({
      invalid_type_error: 'Last name must be of type string.',
    })
    .min(1, 'Last name cannot be empty.')
    .optional(),
  image: z
    .string({
      invalid_type_error: 'Image must be of type string.',
    })
    .url('Image must be in valid URL format.')
    .min(1, 'Image cannot be empty.')
    .optional(),
})
