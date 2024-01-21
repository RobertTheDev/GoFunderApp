import z from "zod";

export type UpdateDonationSchemaType = z.infer<typeof updateDonationSchema>;

const updateDonationSchema = z.object({
  annonymous: z
    .boolean({
      invalid_type_error: "Annonymous must be of type boolean.",
    })
    .optional(),
  message: z
    .string({
      invalid_type_error: "Message must be of type string.",
    })
    .min(1, "Message cannot be empty.")
    .optional(),
});

export default updateDonationSchema;
