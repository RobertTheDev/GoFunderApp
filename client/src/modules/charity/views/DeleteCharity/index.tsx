import { ReactElement } from "react";
import DeleteCharityForm from "../../components/DeleteCharityForm";
import Seo from "../../../common/Seo";

export default function DeleteCharityRoute(): ReactElement {
  return (
    <div>
      <Seo title="Delete Charity" />
      <p>Delete Charity</p>
      <DeleteCharityForm />
    </div>
  );
}
