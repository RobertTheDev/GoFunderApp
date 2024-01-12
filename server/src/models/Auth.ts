import z from 'zod'

// EMAIL AND PASSWORD

export const signUpWithEmailAndPasswordSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required',
    })
    .email('Email must be in valid email format.')
    .min(3, 'Email must be at least three characters long.'),
  firstName: z
    .string({
      invalid_type_error: 'First name must be a string.',
      required_error: 'First name is required',
    })
    .min(1, 'First name cannot be empty.'),
  lastName: z
    .string({
      invalid_type_error: 'Last name must be a string.',
      required_error: 'Last name is required',
    })
    .min(1, 'Last name cannot be empty.')
    .optional(),
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

export const signInWithEmailAndPasswordSchema = z.object({
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

export const changePasswordSchema = z.object({
  email: z.string({ required_error: 'Email is required' }),
  currentPasword: z.string({ required_error: 'Current password is required' }),
  newPassword: z
    .string({
      invalid_type_error: 'New password must be a string.',
      required_error: 'New password is required',
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

export const changeEmailSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required',
    })
    .email('Email must be in valid email format.')
    .min(3, 'Email must be at least three characters long.'),
  password: z.string({ required_error: 'name is required' }),
})

export const sendPasswordResetSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required',
    })
    .email('Email must be in valid email format.')
    .min(3, 'Email must be at least three characters long.'),
})

export const resetPasswordSchema = z.object({
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

export const sendEmailVerificationSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required',
    })
    .email('Email must be in valid email format.')
    .min(3, 'Email must be at least three characters long.'),
})

//   MAGIC LINK

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
