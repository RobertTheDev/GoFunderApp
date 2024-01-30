import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import UpdateFundraiserForm from "../../components/UpdateFundraiserForm";

export default function UpdateFundraiserPage(): ReactElement {
  return (
    <>
      <Seo
        title="Update Fundraiser"
        description={`
        This page allows you to update your fundraiser 
        data information on GoFunder using the update 
        fundraiser form. You can update data 
        including name, target, and image.
      `}
      />
      <div>
        <p>Update Fundraiser Page</p>
        <UpdateFundraiserForm />
      </div>
    </>
  );
}
