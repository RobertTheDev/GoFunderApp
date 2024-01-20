import z from "zod";

export type SaveFundraiserSchemaType = z.infer<typeof saveFundraiserSchema>;

const saveFundraiserSchema = z.object({
  fundraiserId: z
    .string({
      invalid_type_error: "Fundraiser ID must be a string.",
      required_error: "Fundraiser ID is required.",
    })
    .min(1, "Fundraiser ID cannot be empty."),
  userId: z
    .string({
      invalid_type_error: "User ID must be a string.",
      required_error: "User ID is required.",
    })
    .min(1, "User ID cannot be empty."),
});

export default saveFundraiserSchema;
