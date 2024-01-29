import ISeo from "../../../../interfaces/Seo";
import { ReactElement } from "react";
import Seo from "../../../common/Seo";

const seo: ISeo = {
  title: "Reset Password",
  description:
    "Reset your password securely in a few simple steps. Prioritising your account security. Regain control of your access effortlessly and with confidence.",
};

export default function PageSeo(): ReactElement {
  return <Seo title={seo.title} description={seo.description} />;
}
