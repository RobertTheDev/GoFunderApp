import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import NotFoundPageTemplate from "../../templates/NotFoundPageTemplate";

export default function NotFoundPage(): ReactElement {
  return (
    <>
      <Seo title="404 - Not Found" description="" />
      <NotFoundPageTemplate />
    </>
  );
}
