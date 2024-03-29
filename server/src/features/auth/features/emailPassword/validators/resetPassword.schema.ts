import { z } from 'zod'

const resetPasswordSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string.',
      required_error: 'Password is required',
    })
    .max(64, 'Password must be no more than sixty-four characters long.')
    .min(8, 'Password must be at least eight characters long.')
    .refine((data: string) => /\d/.test(data), {
      message: 'Password must contain at least one number.',
    })
    .refine((data: string) => /[A-Z]/.test(data), {
      message: 'Password must contain at least one capital letter.',
    })
    .refine((data: string) => /[!@#$%^&*(),.?":{}|<>]/.test(data), {
      message: 'Password must contain at least one special character.',
    }),
})

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>

export default resetPasswordSchema
