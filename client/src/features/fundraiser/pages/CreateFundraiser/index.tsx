import { ReactElement } from "react";
import CreateFundraiserForm from "../../components/CreateFundraiserForm";
import Seo from "../../../common/Seo";

export default function CreateFundraiserPage(): ReactElement {
  return (
    <div>
      <Seo title="Create Fundraiser" description="" />
      <p>Create Fundraiser</p>
      <CreateFundraiserForm />
    </div>
  );
}
