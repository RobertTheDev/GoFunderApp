import z from "zod";

// Schema defines the relevant fields to successfully follow a charity.
const followCharitySchema = z.object({
  charityId: z
    .string({
      invalid_type_error: "Charity ID must be of type string.",
      required_error: "Charity ID is required.",
    })
    .min(1, "Charity ID is required."),
  userId: z
    .string({
      invalid_type_error: "User ID must be of type string.",
      required_error: "User ID is required.",
    })
    .min(1, "User ID is required."),
});

export default followCharitySchema;

// Infers the schema to be a type to work with TypeScript.
export type FollowCharitySchemaType = z.infer<typeof followCharitySchema>;
