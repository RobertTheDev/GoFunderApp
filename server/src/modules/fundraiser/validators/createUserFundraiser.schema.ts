import z from 'zod'

const createUserFundraiserSchema = z.object({
  category: z
    .string({
      invalid_type_error: 'Category must be of type string.',
      required_error: 'Category is required.',
    })
    .min(1, 'Category cannot be empty.'),
  deadlineDate: z
    .string({
      invalid_type_error: 'Deadline date must be of type string.',
    })
    .datetime({ message: 'Deadline date must be a valid date format.' })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Description must be of type string.',
      required_error: 'Description is required.',
    })
    .min(1, 'Description cannot be empty.'),
  headline: z
    .string({
      invalid_type_error: 'Headline must be of type string.',
      required_error: 'Headline is required.',
    })
    .min(1, 'Headline cannot be empty.'),
  image: z
    .string({
      invalid_type_error: 'Image must be of type string.',
      required_error: 'Image is required.',
    })
    .url('Image must in valid URL format.')
    .min(1, 'Image cannot be empty.'),
  name: z
    .string({
      invalid_type_error: 'Name must be of type string.',
      required_error: 'Name is required.',
    })
    .min(1, 'Name cannot be empty.'),
  target: z
    .number({
      invalid_type_error: 'Target must be of type string.',
      required_error: 'Target is required.',
    })
    .min(1, 'Target cannot be empty.'),
  userId: z
    .string({
      invalid_type_error: 'User ID must be of type string.',
      required_error: 'User ID is required.',
    })
    .min(1, 'User ID cannot be empty.'),
})

export default createUserFundraiserSchema
