import z from "zod";

export type CreateDonationSchemaType = z.infer<typeof createDonationSchema>;

const createDonationSchema = z.object({
  amount: z
    .number({
      invalid_type_error: "Amount must be of type integer.",
      required_error: "Amount is required.",
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
      required_error: "Fundraiser ID is required",
    })
    .min(1, "Fundraiser ID is required."),
  message: z
    .string({
      invalid_type_error: "Message must be of type string.",
      required_error: "Message is required.",
    })
    .min(1, "Message is required."),
});

export default createDonationSchema;
