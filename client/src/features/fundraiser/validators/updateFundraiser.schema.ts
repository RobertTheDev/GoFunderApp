import z from "zod";

export type UpdateFundraiserSchemaType = z.infer<typeof updateFundraiserSchema>;

const updateFundraiserSchema = z.object({
  category: z
    .string({
      invalid_type_error: "Category must be of type string.",
    })
    .min(1, "Category cannot be empty.")
    .optional(),
  deadlineDate: z
    .string({
      invalid_type_error: "Deadline date must be of type string.",
    })
    .datetime({ message: "Deadline date must be a valid date format." })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be of type string.",
    })
    .min(1, "Description cannot be empty.")
    .optional(),
  headline: z
    .string({
      invalid_type_error: "Headline must be of type string.",
    })
    .min(1, "Headline cannot be empty.")
    .optional(),
  image: z
    .string({
      invalid_type_error: "Image must be of type string.",
    })
    .url("Image must in valid URL format.")
    .min(1, "Image cannot be empty.")
    .optional(),
  name: z
    .string({
      invalid_type_error: "Name must be of type string.",
    })
    .min(1, "Name cannot be empty.")
    .optional(),
  target: z
    .number({
      invalid_type_error: "Target must be of type string.",
    })
    .min(1, "Target cannot be empty.")
    .optional(),

  charityId: z
    .string({
      invalid_type_error: "Charity ID must be of type string.",
    })
    .min(1, "Charity ID cannot be empty.")
    .optional(),

  userId: z
    .string({
      invalid_type_error: "User ID must be of type string.",
    })
    .min(1, "User ID cannot be empty.")
    .optional(),
});

export default updateFundraiserSchema;
