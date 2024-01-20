import { z } from "zod";

export type UpdateCharitySchemaType = z.infer<typeof updateCharitySchema>;

const updateCharitySchema = z.object({
  category: z
    .string({
      invalid_type_error: "Category must be of type string.",
    })
    .min(1, { message: "Category is required." })
    .optional(),
  name: z
    .string({
      invalid_type_error: "Name must be of type string.",
    })
    .min(1, { message: "Name is required." })
    .optional(),
  logo: z
    .string({
      invalid_type_error: "Logo URL must be of type string.",
    })
    .url("Logo must a valid url.")
    .min(1, { message: "Logo URL is required." })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be of type string.",
    })
    .min(1, { message: "Description is required." })
    .optional(),
});

export default updateCharitySchema;
