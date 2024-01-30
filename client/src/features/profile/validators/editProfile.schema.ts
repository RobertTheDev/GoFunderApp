import z from 'zod';

// Schema defines the relevant fields to successfully edit a profile.
const editProfileSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string.'
    })
    .min(1, 'Name cannot be empty.')
    .optional()
});

export default editProfileSchema;

// Infers the schema to be a type to work with TypeScript.
export type EditProfileSchemaType = z.infer<typeof editProfileSchema>;
