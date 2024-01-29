import { z } from 'zod'

const signInWithEmailAndPasswordSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required',
    })
    .email('Email must be in valid email format.')
    .min(3, 'Email must be at least three characters long.'),
  password: z.string({
    invalid_type_error: 'Password must be a string.',
    required_error: 'Password is required.',
  }),
})

export type SignInWithEmailAndPasswordSchemaType = z.infer<
  typeof signInWithEmailAndPasswordSchema
>

export default signInWithEmailAndPasswordSchema
