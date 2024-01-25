import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import UpdateFundraiserForm from "../../components/UpdateFundraiserForm";

export default function UpdateFundraiserPage(): ReactElement {
  return (
    <>
      <Seo title="Update Fundraiser" description="" />
      <div>
        <p>Update Fundraiser Page</p>
        <UpdateFundraiserForm />
      </div>
    </>
  );
}
