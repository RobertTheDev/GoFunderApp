import { z } from "zod";
import categoryOptions from "../../../utils/categoryOptions";

// Schema defines the relevant fields to successfully update a charity.
const updateCharitySchema = z.object({
  category: z
    .string({
      invalid_type_error: "Category must be of type string.",
      required_error: "Category is required.",
    })
    .min(1, { message: "Category is required." })
    .refine((value) => categoryOptions.includes(value), {
      message: "Category is not a valid option.",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be of type string.",
    })
    .min(1, { message: "Description is required." })
    .optional(),
  logo: z
    .string({
      invalid_type_error: "Logo must be of type string.",
      required_error: "Logo is required.",
    })
    .url("Logo must be a valid url.")
    .min(1, { message: "Logo is required." })
    .optional(),
  name: z
    .string({
      invalid_type_error: "Name must be of type string.",
      required_error: "Name is required.",
    })
    .min(1, { message: "Name is required." })
    .optional(),
  slug: z
    .string({
      invalid_type_error: "Slug must be of type string.",
      required_error: "Slug is required.",
    })
    .min(1, { message: "Slug is required." })
    .optional(),
});

export default updateCharitySchema;

// Infers the schema to be a type to work with TypeScript.
export type UpdateCharitySchemaType = z.infer<typeof updateCharitySchema>;
