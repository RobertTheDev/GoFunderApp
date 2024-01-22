import { ReactElement } from "react";
import useUpdateDonation from "./useUpdateDonation";
import { useParams } from "react-router-dom";

export default function CreateDonationForm(): ReactElement {
  const { id } = useParams();

  const { errors, handleUpdateDonation, message, register } = useUpdateDonation(
    String(id)
  );

  return (
    <div>
      <form onSubmit={handleUpdateDonation}>
        <label htmlFor="message">Message</label>
        <input {...register("message")} type="text" name="message" />
        {errors.message?.message && <p>{errors.message.message}</p>}

        <label htmlFor="annonymous">Annonymous</label>
        <input {...register("annonymous")} type="checkbox" name="annonymous" />
        {errors.annonymous?.message && <p>{errors.annonymous.message}</p>}

        {message && <p>{message.content}</p>}

        <button type="submit">Donate</button>
      </form>
    </div>
  );
}
