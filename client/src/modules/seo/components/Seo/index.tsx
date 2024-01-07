import { ReactElement } from "react";
import { Helmet } from "react-helmet-async";

export default function Seo({ title }: { title: string }): ReactElement {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href="https://www.tacobell.com/" />
    </Helmet>
  );
}
