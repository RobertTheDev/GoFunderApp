import { ReactElement } from "react";
import DeleteCharityForm from "../../components/DeleteCharityForm";
import Seo from "../../../seo/components/Seo";

export default function DeleteCharityRoute(): ReactElement {
  return (
    <div>
      <Seo title="Delete Charity" />
      <p>Delete Charity</p>
      <DeleteCharityForm />
    </div>
  );
}
