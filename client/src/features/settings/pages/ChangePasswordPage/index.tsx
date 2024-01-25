import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import ChangePasswordForm from "../../components/ChangePasswordForm";

export default function ChangePasswordPage(): ReactElement {
  return (
    <>
      <Seo title="Change Password" description="" />
      <ChangePasswordForm />
    </>
  );
}
