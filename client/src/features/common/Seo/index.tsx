import { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import ISeo from "../../../interfaces/Seo";

export default function Seo(seo: ISeo): ReactElement {
  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description}></meta>
      <link rel="canonical" href="https://www.tacobell.com/" />
    </Helmet>
  );
}
