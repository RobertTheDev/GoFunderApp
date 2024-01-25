import { ReactElement } from "react";
import ChangeEmailForm from "../../components/ChangeEmailForm";
import Seo from "../../../common/Seo";

export default function ChangeEmailPage(): ReactElement {
  return (
    <>
      <Seo title="Change Email" description="" />
      <ChangeEmailForm />
    </>
  );
}
