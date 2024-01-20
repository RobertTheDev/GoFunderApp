import { z } from "zod";

export type CreateCharitySchemaType = z.infer<typeof createCharitySchema>;

const createCharitySchema = z.object({
  category: z
    .string({
      invalid_type_error: "Category must be of type string.",
      required_error: "Category is required.",
    })

    .min(1, { message: "Category is required." }),
  name: z
    .string({
      invalid_type_error: "Name must be of type string.",
      required_error: "Name is required.",
    })
    .min(1, { message: "Name is required." }),
  logo: z
    .string({
      invalid_type_error: "Logo URL must be of type string.",
      required_error: "Logo is required.",
    })
    .url("Logo must a valid url.")
    .min(1, { message: "Logo URL is required." }),
  description: z
    .string({
      invalid_type_error: "Description must be of type string.",
      required_error: "Description is required.",
    })
    .min(1, { message: "Description is required." }),
});

export default createCharitySchema;
