import { ReactElement } from "react";
import DeleteCharityForm from "../../components/DeleteCharityForm";

export default function DeleteCharityRoute(): ReactElement {
  return (
    <div>
      <p>Delete Charity</p>
      <DeleteCharityForm />
    </div>
  );
}
