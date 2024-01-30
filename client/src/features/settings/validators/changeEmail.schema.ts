import { z } from 'zod'

export const changeEmailSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required',
    })
    .email('Email must be in valid email format.')
    .min(3, 'Email must be at least three characters long.'),
  password: z.string({ required_error: 'Password is required' }),
})

export type ChangeEmailSchemaType = z.infer<typeof changeEmailSchema>

export default changeEmailSchema
