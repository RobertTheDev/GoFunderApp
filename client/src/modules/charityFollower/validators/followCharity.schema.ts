import z from "zod";

export type FollowCharitySchemaType = z.infer<typeof followCharitySchema>;

export const followCharitySchema = z.object({
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
