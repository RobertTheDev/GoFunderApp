import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import Banner from "../../components/Banner";
import CategoryFundraiserSection from "../../components/CategoryFundraiserSection";
import CategoryMenu from "../../components/CategoryMenu";

export default function HomePage(): ReactElement {
  return (
    <>
      <Seo title="Home" description="" />
      <div>
        <Banner />
        <CategoryFundraiserSection category="Category" />
        <CategoryFundraiserSection category="Disability" />
        <CategoryFundraiserSection category="Disability" />
        <CategoryMenu />
        <CategoryFundraiserSection category="Disability" />
        <CategoryFundraiserSection category={"Disability"} />
        <CategoryFundraiserSection category="Disability" />
      </div>
    </>
  );
}
