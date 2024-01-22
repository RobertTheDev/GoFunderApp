import { ReactElement } from "react";
import UpdateCharityForm from "../../components/UpdateCharityForm";
import Seo from "../../../common/Seo";

export default function UpdateCharityPage(): ReactElement {
  return (
    <div>
      <Seo title="Update Charity" description="" />
      <p>Update Charity</p>
      <UpdateCharityForm />
    </div>
  );
}
