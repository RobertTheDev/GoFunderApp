import { z } from 'zod'

export const generateOtpSchema = z.object({
  mobilePhoneNumber: z
    .string({
      invalid_type_error: 'Mobile phone number must be a string.',
      required_error: 'Mobile phone number is required',
    })
    .min(1, 'Mobile phone number cannot be empty.'),
  secret: z
    .string({
      invalid_type_error: 'Secret must be a string.',
      required_error: 'Secret is required',
    })
    .min(1, 'Secret cannot be empty.'),
})

export const verifyOtpSchema = z.object({
  token: z
    .string({
      invalid_type_error: 'Token must be a string.',
      required_error: 'Token is required',
    })
    .min(1, 'Token cannot be empty.'),
})
