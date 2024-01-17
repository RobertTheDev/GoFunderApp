import { z } from "zod";

export type SendOtpEmailCodeSchemaType = z.infer<typeof sendOtpEmailCodeSchema>;

export const sendOtpEmailCodeSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email address must be a string.",
      required_error: "Email address is required",
    })
    .email("Please provide a valid email address.")
    .min(1, "Email address cannot be empty."),
});
