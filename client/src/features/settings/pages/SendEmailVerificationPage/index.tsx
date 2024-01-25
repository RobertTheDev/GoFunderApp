import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import SendEmailVerificationForm from "../../components/SendEmailVerificationForm";

export default function SendEmailVerificationPage(): ReactElement {
  return (
    <>
      <Seo title="Send Email Verification" description="" />
      <SendEmailVerificationForm />
    </>
  );
}
