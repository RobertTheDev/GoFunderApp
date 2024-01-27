import { z } from "zod";

export type SendPasswordResetSchemaType = z.infer<
  typeof sendPasswordResetSchema
>;

export const sendPasswordResetSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string.",
      required_error: "Email is required",
    })
    .email("Email must be in valid email format.")
    .min(3, "Email must be at least three characters long."),
});

export default sendPasswordResetSchema;
