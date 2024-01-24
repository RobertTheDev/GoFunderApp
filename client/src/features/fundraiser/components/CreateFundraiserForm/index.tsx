import { ReactElement } from "react";
import useCreateFundraiser from "./useCreateFundraiser";

export default function CreateFundraiserForm(): ReactElement {
  const { errors, handleCreateFundraiser, message, register } =
    useCreateFundraiser();

  return (
    <form onSubmit={handleCreateFundraiser}>
      <label htmlFor="name">Name</label>
      <input {...register("name")} type="text" name="name" />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <label htmlFor="category">Category</label>
      <input {...register("category")} type="text" name="category" />
      {errors.category?.message && <p>{errors.category?.message}</p>}

      <label htmlFor="deadlineDate">Deadline Date</label>
      <input
        {...register("deadlineDate", { valueAsDate: true })}
        type="datetime-local"
        name="deadlineDate"
      />
      {errors.deadlineDate?.message && <p>{errors.deadlineDate?.message}</p>}

      <label htmlFor="description">Description</label>
      <input {...register("description")} type="text" name="description" />
      {errors.description?.message && <p>{errors.description?.message}</p>}

      <label htmlFor="headline">Headline</label>
      <input {...register("headline")} type="text" name="headline" />
      {errors.headline?.message && <p>{errors.headline?.message}</p>}

      <label htmlFor="image">Image</label>
      <input {...register("image")} type="url" name="image" />
      {errors.image?.message && <p>{errors.image?.message}</p>}

      <label htmlFor="target">Target</label>
      <input
        {...register("target", { valueAsNumber: true })}
        type="number"
        name="target"
      />
      {errors.target?.message && <p>{errors.target?.message}</p>}

      {message && <p>{message.content}</p>}

      <button type="submit">Create Fundraiser</button>
    </form>
  );
}
