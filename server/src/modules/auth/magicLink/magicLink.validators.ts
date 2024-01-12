import { z } from 'zod'

export const sendMagicLinkSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required',
    })
    .email('Email must be in valid email format.')
    .min(3, 'Email must be at least three characters long.'),
})

export const verifyMagicLinkSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required',
    })
    .email('Email must be in valid email format.')
    .min(3, 'Email must be at least three characters long.'),
  token: z
    .string({
      invalid_type_error: 'Token must be a string.',
      required_error: 'Token is required',
    })
    .min(1, 'Token cannot be empty.'),
})
