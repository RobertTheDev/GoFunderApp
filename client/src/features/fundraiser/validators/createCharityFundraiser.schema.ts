import z from "zod";
import categoryOptions from "../../../utils/categoryOptions";

const createCharityFundraiserSchema = z.object({
  category: z
    .string({
      invalid_type_error: "Category must be a string.",
      required_error: "Category is required.",
    })
    .min(1, "Category is required.")
    .refine((value) => categoryOptions.includes(value), {
      message: "Category is not a valid option.",
    }),
  charityId: z
    .string({
      invalid_type_error: "Charity ID must be a string.",
      required_error: "Charity ID is required.",
    })
    .min(1, "Charity ID is required."),
  deadlineDate: z
    .string({
      invalid_type_error: "Deadline date must be a string.",
    })
    .datetime({ message: "Deadline date must be a valid date." })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be a string.",
      required_error: "Description is required.",
    })
    .min(1, "Description is required."),
  headline: z
    .string({
      invalid_type_error: "Headline must be a string.",
      required_error: "Headline is required.",
    })
    .min(1, "Headline is required."),
  image: z
    .string({
      invalid_type_error: "Image must be a string.",
      required_error: "Image is required.",
    })
    .url("Image must be a valid URL.")
    .min(1, "Image is required."),
  name: z
    .string({
      invalid_type_error: "Name must be a string.",
      required_error: "Name is required.",
    })
    .min(1, "Name is required."),
  slug: z
    .number({
      invalid_type_error: "Slug must be a string.",
      required_error: "Slug is required.",
    })
    .min(1, "Slug is required."),
  target: z
    .number({
      invalid_type_error: "Target must be a number.",
      required_error: "Target is required.",
    })
    .min(1, "Target is required."),
});

export type CreateCharityFundraiserSchemaType = z.infer<
  typeof createCharityFundraiserSchema
>;

export default createCharityFundraiserSchema;
