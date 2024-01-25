import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import VerifyEmailForm from "../../components/VerifyEmailForm";

export default function VerifyEmailPage(): ReactElement {
  return (
    <>
      <Seo title="Verify Email" description="" />
      <VerifyEmailForm />
    </>
  );
}
