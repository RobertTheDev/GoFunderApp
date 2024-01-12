import { z } from 'zod'

const resetPasswordSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required',
    })
    .email('Email must be in valid email format.'),
  accessToken: z.string({ required_error: 'Access token is required.' }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string.',
      required_error: 'Password is required',
    })
    .max(64, 'Password must be no more than sixty-four characters long.')
    .min(8, 'Password must be at least eight characters long.')
    .refine(data => /\d/.test(data), {
      message: 'Password must contain at least one number.',
    })
    .refine(data => /[A-Z]/.test(data), {
      message: 'Password must contain at least one capital letter.',
    })
    .refine(data => /[!@#$%^&*(),.?":{}|<>]/.test(data), {
      message: 'Password must contain at least one special character.',
    }),
})

export default resetPasswordSchema
