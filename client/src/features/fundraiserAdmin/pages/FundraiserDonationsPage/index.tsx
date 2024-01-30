import { ReactElement } from "react";
import Seo from "../../../common/Seo";

export default function FundraiserDonationsPage(): ReactElement {
  return (
    <>
      <Seo
        title="Fundraiser Donations"
        description={`
        The page displays a list of donations made and the 
        statistical data of your fundraiser on GoFunder. 
        This will allow you to track the performance of your fundraiser.
      `}
      />
      <div>
        <p>Fundraiser Donations Page</p>
      </div>
    </>
  );
}
