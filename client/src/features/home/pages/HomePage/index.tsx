import { ReactElement } from "react";
import Banner from "../../components/Banner";
import CategoryFundraiserSection from "../../components/CategoryFundraiserSection";
import CategoryMenu from "../../components/CategoryMenu";

export default function HomePage(): ReactElement {
  return (
    <div>
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
