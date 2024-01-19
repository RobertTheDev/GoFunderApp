import z from "zod";

export type UpdateDonationSchemaType = z.infer<typeof updateDonationSchema>;

const updateDonationSchema = z.object({
  amount: z
    .number({
      invalid_type_error: "Amount must be of type integer.",
    })
    .min(1, "Amount is required."),
  annonymous: z
    .boolean({
      invalid_type_error: "Annonymous must be of type boolean.",
    })
    .optional(),
  fundraiserId: z
    .string({
      invalid_type_error: "Fundraiser ID must be of type string.",
    })
    .min(1, "Fundraiser ID is required."),
  message: z
    .string({
      invalid_type_error: "Message must be of type string.",
    })
    .min(1, "Message is required."),
});

export default updateDonationSchema;
