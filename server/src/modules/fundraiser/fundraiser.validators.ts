import z from 'zod'

export const createFundraiserSchema = z.object({
  category: z
    .number({
      invalid_type_error: 'Category must be of type integer.',
      required_error: 'Category is required.',
    })
    .min(1, 'Category cannot be empty.'),
  deadlineDate: z
    .boolean({
      invalid_type_error: 'Annonymous must be of type boolean.',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Description must be of type string.',
      required_error: 'Description is required.',
    })
    .min(1, 'Description cannot be empty.'),
  headline: z
    .string({
      invalid_type_error: 'Message must be of type string.',
      required_error: 'Message is required.',
    })
    .min(1, 'Message cannot be empty.'),
  image: z
    .string({
      invalid_type_error: 'Message must be of type string.',
      required_error: 'Message is required.',
    })
    .min(1, 'Message cannot be empty.'),
  target: z
    .string({
      invalid_type_error: 'Message must be of type string.',
      required_error: 'Message is required.',
    })
    .min(1, 'Message cannot be empty.'),

  charityId: z
    .string({
      invalid_type_error: 'Message must be of type string.',
      required_error: 'Message is required.',
    })
    .min(1, 'Message cannot be empty.'),

  userId: z
    .string({
      invalid_type_error: 'Message must be of type string.',
      required_error: 'Message is required.',
    })
    .min(1, 'Message cannot be empty.'),
})

export const updateFundraiserSchema = z.object({
  category: z
    .string({
      invalid_type_error: 'Category must be of type integer.',
    })
    .min(1, 'Category cannot be empty.')
    .optional(),
  deadlineDate: z
    .string({
      invalid_type_error: 'Annonymous must be of type boolean.',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Description must be of type string.',
    })
    .min(1, 'Description cannot be empty.')
    .optional(),
  headline: z
    .string({
      invalid_type_error: 'Message must be of type string.',
    })
    .min(1, 'Message cannot be empty.')
    .optional(),
  image: z
    .string({
      invalid_type_error: 'Message must be of type string.',
    })
    .url('Image must in valid URL format.')
    .min(1, 'Message cannot be empty.')
    .optional(),
  target: z
    .string({
      invalid_type_error: 'Message must be of type string.',
    })
    .min(1, 'Message cannot be empty.')
    .optional(),
})
