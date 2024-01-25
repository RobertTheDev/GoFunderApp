import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import SetUpTotpForm from "../../components/SetUpTotpForm";

export default function SetUpTotpPage(): ReactElement {
  return (
    <>
      <Seo title="Set Up MFA" description="" />
      <SetUpTotpForm />
    </>
  );
}
