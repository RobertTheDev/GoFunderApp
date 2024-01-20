import { ReactElement } from "react";
import UpdateCharityForm from "../../components/UpdateCharityForm";
import Seo from "../../../common/Seo";

export default function UpdateCharityRoute(): ReactElement {
  return (
    <div>
      <Seo title="Update Charity" />
      <p>Update Charity</p>
      <UpdateCharityForm />
    </div>
  );
}
