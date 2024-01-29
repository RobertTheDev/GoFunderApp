import { ReactElement } from "react";
import PasswordResetForm from "../../components/password/PasswordResetForm";
import PageSeo from "./PageSeo";

export default function ResetPasswordPage(): ReactElement {
  return (
    <>
      <PageSeo />
      <div>
        <PasswordResetForm />
      </div>
    </>
  );
}
