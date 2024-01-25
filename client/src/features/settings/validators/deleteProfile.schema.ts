import { z } from "zod";

const deleteProfileSchema = z.object({
  confirmDeletion: z
    .string({
      invalid_type_error: "Delete confirmation must be a string.",
      required_error: "You must type DELETE to complete this action.",
    })
    .min(1, "You must type DELETE to complete this action.")
    .refine((value) => value === "DELETE", {
      message: "You must type DELETE to complete this action.",
    }),
});

export default deleteProfileSchema;

// Infers the schema to be a type to work with TypeScript.
export type DeleteProfileSchemaType = z.infer<typeof deleteProfileSchema>;
