import { z } from "zod";

const sendPasswordResetSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string.",
      required_error: "Email is required",
    })
    .email("Email must be in valid email format.")
    .min(3, "Email must be at least three characters long."),
});

export type SendPasswordResetSchemaType = z.infer<
  typeof sendPasswordResetSchema
>;

export default sendPasswordResetSchema;
