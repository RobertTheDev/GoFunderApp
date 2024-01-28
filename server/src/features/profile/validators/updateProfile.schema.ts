import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string.',
    })
    .min(1, 'Name cannot be empty.'),
})

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>

export default updateProfileSchema
