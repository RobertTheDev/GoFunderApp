import { ReactElement } from "react";
import useDeleteProfile from "./useDeleteProfile";

export default function DeleteProfileForm(): ReactElement {
  const { errors, handleDeleteProfile, message, register } = useDeleteProfile();

  return (
    <form onSubmit={handleDeleteProfile}>
      <label htmlFor="confirmDeletion">Confirm Deletion</label>
      <input
        {...register("confirmDeletion")}
        type="text"
        name="confirmDeletion"
      />
      {errors.confirmDeletion?.message && (
        <p>{errors.confirmDeletion?.message}</p>
      )}

      {message && <p>{message.content}</p>}

      <button type="submit">Close Account</button>
    </form>
  );
}
