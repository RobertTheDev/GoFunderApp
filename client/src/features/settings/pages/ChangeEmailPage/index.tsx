import { ReactElement } from "react";
import ChangeEmailForm from "../../components/ChangeEmailForm";
import Seo from "../../../common/Seo";
import SettingsPageLayout from "../../layouts/SettingsPageLayout";

export default function ChangeEmailPage(): ReactElement {
  return (
    <>
      <Seo
        title="Change Email"
        description={`
      You can change your email here on this page. 
      Enter your current password and your new email address 
      in order to update your email address.
      `}
      />
      <SettingsPageLayout>
        <ChangeEmailForm />
      </SettingsPageLayout>
    </>
  );
}
