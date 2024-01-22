import { ReactElement } from "react";
import CharityDonationsPageTemplate from "../../templates/CharityDonationsPage";
import Seo from "../../../common/Seo";

export default function CharityDonationsPage(): ReactElement {
  return (
    <>
      <Seo title="Charity Donations" description="" />
      <CharityDonationsPageTemplate />
    </>
  );
}
