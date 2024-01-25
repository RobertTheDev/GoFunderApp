import { ReactElement } from "react";
import CloseAccountForm from "../../components/CloseAccountForm";
import Seo from "../../../common/Seo";
import SettingsPageLayout from "../../layouts/SettingsPageLayout";

export default function CloseAccountPage(): ReactElement {
  return (
    <>
      <Seo title="Close Account" description="" />
      <SettingsPageLayout>
        <CloseAccountForm />
      </SettingsPageLayout>
    </>
  );
}
