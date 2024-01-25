import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import CloseFundraiserForm from "../../components/CloseFundraiserForm";

export default function CloseFundraiserPage(): ReactElement {
  return (
    <>
      <Seo title="Close Fundraiser" description="" />
      <div>
        <p>Close Fundraiser Page</p>
        <CloseFundraiserForm />
      </div>
    </>
  );
}
