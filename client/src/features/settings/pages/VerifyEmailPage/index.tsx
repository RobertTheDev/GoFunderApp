import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import VerifyEmailForm from "../../components/VerifyEmailForm";
import SettingsPageLayout from "../../layouts/SettingsPageLayout";

export default function VerifyEmailPage(): ReactElement {
  return (
    <>
      <Seo title="Verify Email" description="" />
      <SettingsPageLayout>
        <VerifyEmailForm />
      </SettingsPageLayout>
    </>
  );
}
