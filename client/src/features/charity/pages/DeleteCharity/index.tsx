import { ReactElement } from "react";
import DeleteCharityForm from "../../components/DeleteCharityForm";
import Seo from "../../../common/Seo";

export default function DeleteCharityPage(): ReactElement {
  return (
    <div>
      <Seo title="Delete Charity" description="" />
      <p>Delete Charity</p>
      <DeleteCharityForm />
    </div>
  );
}
