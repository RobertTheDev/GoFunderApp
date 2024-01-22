import { ReactElement } from "react";
import DeleteFundraiserForm from "../../components/DeleteFundraiserForm";
import Seo from "../../../common/Seo";

export default function DeleteFundraiserPage(): ReactElement {
  return (
    <div>
      <Seo title="Delete Fundraiser" description="" />
      <p>Delete Fundraiser</p>
      <DeleteFundraiserForm />
    </div>
  );
}
