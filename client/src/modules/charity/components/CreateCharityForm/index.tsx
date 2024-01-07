import axios from "axios";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const CreateCharitySchema = z.object({
  category: z.string().min(1, { message: "Category is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  logoUrl: z.string().min(1, { message: "Logo URL is required." }),
  description: z.string().min(1, { message: "Description is required." }),
});

type CreateCharitySchemaType = z.infer<typeof CreateCharitySchema>;

export default function CreateCharityForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCharitySchemaType>({
    resolver: zodResolver(CreateCharitySchema),
  });

  const handleCreateCharity = handleSubmit(async (data) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/charities/create`,
        data
      );
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={handleCreateCharity}>
      <label htmlFor="name">Name</label>
      <input {...register("name")} type="text" name="name" />
      {errors.name?.message && <p>{errors.name.message}</p>}
      <label htmlFor="description">Description</label>
      <input {...register("description")} type="text" name="description" />
      {errors.description?.message && <p>{errors.description.message}</p>}
      <label htmlFor="logoUrl">Logo URL</label>
      <input {...register("logoUrl")} type="url" name="logoUrl" />
      {errors.logoUrl?.message && <p>{errors.logoUrl.message}</p>}
      <label htmlFor="category">Category</label>
      <input {...register("category")} type="text" name="category" />
      {errors.category?.message && <p>{errors.category.message}</p>}
      <button type="submit">Create Charity</button>
    </form>
  );
}
