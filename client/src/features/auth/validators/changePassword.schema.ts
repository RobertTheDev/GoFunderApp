import { z } from 'zod';

export const changePasswordSchema = z.object({
  currentPassword: z.string({ required_error: 'Current password is required' }),
  newPassword: z
    .string({
      invalid_type_error: 'New password must be a string.',
      required_error: 'New password is required'
    })
    .max(64, 'Password must be no more than sixty-four characters long.')
    .min(8, 'Password must be at least eight characters long.')
    .refine((data) => /\d/.test(data), {
      message: 'Password must contain at least one number.'
    })
    .refine((data) => /[A-Z]/.test(data), {
      message: 'Password must contain at least one capital letter.'
    })
    .refine((data) => /[!@#$%^&*(),.?":{}|<>]/.test(data), {
      message: 'Password must contain at least one special character.'
    })
});

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export default changePasswordSchema;
