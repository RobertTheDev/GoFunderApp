import { ReactElement } from "react";
import Banner from "../../components/Banner";
import CategoryFundraiserSection from "../../components/CategoryFundraiserSection";
import CategoryMenu from "../../components/CategoryMenu";
import Seo from "../../../common/Seo";

export default function HomePage(): ReactElement {
  return (
    <div>
      <Seo title="Home" description="" />
      <Banner />
      <CategoryFundraiserSection category="Disability" />
      <CategoryFundraiserSection category="Disability" />
      <CategoryFundraiserSection category="Disability" />
      <CategoryMenu />
      <CategoryFundraiserSection category="Disability" />
      <CategoryFundraiserSection category={"Disability"} />
      <CategoryFundraiserSection category="Disability" />
    </div>
  );
}
