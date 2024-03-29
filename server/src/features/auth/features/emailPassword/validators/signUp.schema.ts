import { z } from 'zod'

const signUpWithEmailAndPasswordSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required',
    })
    .email('Email must be in valid email format.')
    .min(3, 'Email must be at least three characters long.'),
  name: z
    .string({
      invalid_type_error: 'Name must be a string.',
      required_error: 'Name is required',
    })
    .min(1, 'Name cannot be empty.'),
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

export type SignUpWithEmailAndPasswordSchemaType = z.infer<
  typeof signUpWithEmailAndPasswordSchema
>

export default signUpWithEmailAndPasswordSchema
