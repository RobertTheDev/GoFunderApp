import { ReactElement } from "react";
import { Helmet } from "react-helmet-async";
import ISeo from "../../../interfaces/Seo";

export default function Seo({ description, title }: ISeo): ReactElement {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <link rel="canonical" href="https://www.tacobell.com/" />
    </Helmet>
  );
}
