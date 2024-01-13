import { ReactElement } from "react";
import useCreateCharityForm from "./useCreateCharityForm";

export default function CreateCharityForm(): ReactElement {
  const { register, errors, handleCreateCharity } = useCreateCharityForm();
  return (
    <form onSubmit={handleCreateCharity}>
      <label htmlFor="name">Name</label>
      <input {...register("name")} type="text" name="name" />
      {errors.name?.message && <p>{errors.name.message}</p>}
      <label htmlFor="description">Description</label>
      <input {...register("description")} type="text" name="description" />
      {errors.description?.message && <p>{errors.description.message}</p>}
      <label htmlFor="logo">Logo URL</label>
      <input {...register("logo")} type="url" name="logo" />
      {errors.logo?.message && <p>{errors.logo.message}</p>}
      <label htmlFor="category">Category</label>
      <input {...register("category")} type="text" name="category" />
      {errors.category?.message && <p>{errors.category.message}</p>}
      <button type="submit">Create Charity</button>
    </form>
  );
}
