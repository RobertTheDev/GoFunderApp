import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import HomePageTemplate from "../../templates/HomePageTemplate";

export default function HomePage(): ReactElement {
  return (
    <>
      <Seo title="Home" description="" />
      <HomePageTemplate />
    </>
  );
}
