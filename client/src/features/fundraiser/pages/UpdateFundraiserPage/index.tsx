import { ReactElement } from "react";
import UpdateFundraiserForm from "../../components/UpdateFundraiserForm";
import Seo from "../../../common/Seo";

export default function UpdateFundraiserPage(): ReactElement {
  return (
    <div>
      <Seo title="Update Fundraiser" description="" />
      <p>Update Fundraiser</p>
      <UpdateFundraiserForm />
    </div>
  );
}
