import z from 'zod'

export const createCharitySchema = z.object({
  category: z
    .string({
      invalid_type_error: 'Category must be of type string.',
      required_error: 'Category is required.',
    })
    .min(1, 'Category cannot be empty.'),
  description: z
    .string({
      invalid_type_error: 'Description must be of type string.',
      required_error: 'Description is required.',
    })
    .min(1, 'Description cannot be empty.'),
  logo: z
    .string({
      invalid_type_error: 'Logo must be of type string.',
      required_error: 'Logo is required',
    })
    .url('Logo must be in valid URL format.')
    .min(1, 'Logo cannot be empty.'),
  name: z
    .string({
      invalid_type_error: 'Name must be of type string.',
      required_error: 'Name is required.',
    })
    .min(1, 'Name cannot be empty.'),
})

export const updateCharitySchema = z.object({
  category: z
    .string({
      invalid_type_error: 'Category must be of type string.',
    })
    .min(1, 'Category cannot be empty.')
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Description must be of type string.',
    })
    .min(1, 'Description cannot be empty.')
    .optional(),
  logo: z
    .string({
      invalid_type_error: 'Logo must be of type string.',
    })
    .url('Logo must be in valid URL format.')
    .min(1, 'Logo cannot be empty.')
    .optional(),
  name: z
    .string({
      invalid_type_error: 'Name must be of type string.',
    })
    .min(1, 'Name cannot be empty.')
    .optional(),
})
