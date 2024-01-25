import { ReactElement } from "react";
import ChangeEmailForm from "../../components/ChangeEmailForm";
import Seo from "../../../common/Seo";
import SettingsPageLayout from "../../layouts/SettingsPageLayout";

export default function ChangeEmailPage(): ReactElement {
  return (
    <>
      <Seo title="Change Email" description="" />
      <SettingsPageLayout>
        <ChangeEmailForm />
      </SettingsPageLayout>
    </>
  );
}
