import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import UserDonationsPageTemplate from "../../templates/UserDonationsPage";

export default function UserDonationsPage(): ReactElement {
  return (
    <>
      <Seo title="User Donations" description="" />
      <UserDonationsPageTemplate />
    </>
  );
}
