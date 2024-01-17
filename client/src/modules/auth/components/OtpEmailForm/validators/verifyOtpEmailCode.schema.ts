import { z } from "zod";

export type VerifyOtpEmailCodeSchemaType = z.infer<
  typeof verifyOtpEmailCodeSchema
>;

export const verifyOtpEmailCodeSchema = z.object({
  code: z
    .string({
      invalid_type_error: "Code must be a string.",
      required_error: "Code is required",
    })
    .max(6, "Please provide the 6 digit code sent to your email address.")
    .min(6, "Please provide the 6 digit code sent to your email address."),
});
