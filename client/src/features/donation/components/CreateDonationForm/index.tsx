import { ReactElement } from "react";
import useCreateDonation from "./useCreateDonation";

export default function CreateDonationForm(): ReactElement {
  const { errors, handleCreateDonation, message, register } =
    useCreateDonation();

  return (
    <div>
      <form onSubmit={handleCreateDonation}>
        <label htmlFor="amount">Amount</label>
        <input {...register("amount")} type="number" name="amount" />
        {errors.amount?.message && <p>{errors.amount.message}</p>}

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
