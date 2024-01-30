import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import VerifyEmailForm from "../../components/VerifyEmailForm";
import SettingsPageLayout from "../../layouts/SettingsPageLayout";

export default function VerifyEmailPage(): ReactElement {
  return (
    <>
      <Seo
        title="Verify Email"
        description={`
        This page verifies your account email address with 
        the valid access code provided in the email we sent
        after you submitted the send email verification form.
        `}
      />
      <SettingsPageLayout>
        <VerifyEmailForm />
      </SettingsPageLayout>
    </>
  );
}
