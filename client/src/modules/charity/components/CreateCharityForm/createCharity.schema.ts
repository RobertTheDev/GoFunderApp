import { z } from "zod";

export type CreateCharitySchemaType = z.infer<typeof CreateCharitySchema>;

const CreateCharitySchema = z.object({
  category: z.string().min(1, { message: "Category is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  logo: z.string().min(1, { message: "Logo URL is required." }),
  description: z.string().min(1, { message: "Description is required." }),
});

export default CreateCharitySchema;
