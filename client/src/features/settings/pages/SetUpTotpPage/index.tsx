import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import SetUpTotpForm from "../../components/SetUpTotpForm";
import SettingsPageLayout from "../../layouts/SettingsPageLayout";

export default function SetUpTotpPage(): ReactElement {
  return (
    <>
      <Seo
        title="Set Up MFA"
        description={`
        This page allows you to set up multi-factor authentication 
        using a time-based one-time password using an authenticator app. 
        You can also turn off this option.
      `}
      />
      <SettingsPageLayout>
        <SetUpTotpForm />
      </SettingsPageLayout>
    </>
  );
}
