import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import ChangePasswordForm from "../../components/ChangePasswordForm";
import SettingsPageLayout from "../../layouts/SettingsPageLayout";

export default function ChangePasswordPage(): ReactElement {
  return (
    <>
      <Seo title="Change Password" description="" />
      <SettingsPageLayout>
        <ChangePasswordForm />
      </SettingsPageLayout>
    </>
  );
}
