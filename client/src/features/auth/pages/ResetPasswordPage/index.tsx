import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import PasswordResetForm from "../../components/password/PasswordResetForm";

export default function ResetPasswordPage(): ReactElement {
  return (
    <>
      <Seo title="Reset Password" description="" />
      <div>
        <PasswordResetForm />
      </div>
    </>
  );
}
