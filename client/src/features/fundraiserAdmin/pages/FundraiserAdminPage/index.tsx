import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import FundraiserAdminMenu from "../../components/FundraiserAdminMenu";

export default function FundraiserAdminPage(): ReactElement {
  return (
    <>
      <Seo title="Fundraiser Admin" description="" />
      <FundraiserAdminMenu />
    </>
  );
}
