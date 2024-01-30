import z from 'zod';

// Schema defines the relevant fields to successfully save a fundraiser.
const saveFundraiserSchema = z.object({
  fundraiserId: z
    .string({
      invalid_type_error: 'Fundraiser ID must be a string.',
      required_error: 'Fundraiser ID is required.'
    })
    .min(1, 'Fundraiser ID is required.')
});

export default saveFundraiserSchema;

// Infers the schema to be a type to work with TypeScript.
export type SaveFundraiserSchemaType = z.infer<typeof saveFundraiserSchema>;
