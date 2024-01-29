import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import Banner from "../../components/Banner";
import CategoryFundraiserSection from "../../components/CategoryFundraiserSection";
import CategoryMenu from "../../components/CategoryMenu";

export default function HomePage(): ReactElement {
  return (
    <>
      <Seo title="GoFunder - Online Fundraising Platform" description="" />
      <div>
        <Banner />
        <CategoryFundraiserSection category="animals-and-pets" />
        <CategoryFundraiserSection category="art-and-culture" />
        <CategoryFundraiserSection category="disability" />
        <CategoryFundraiserSection category="education" />
        <CategoryMenu />
        <CategoryFundraiserSection category={"health-and-medical"} />
        <CategoryFundraiserSection category={"international-aid"} />
        <CategoryFundraiserSection category={"local-community"} />
        <CategoryFundraiserSection category="sports" />
      </div>
    </>
  );
}
