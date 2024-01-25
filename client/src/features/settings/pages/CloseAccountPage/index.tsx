import { ReactElement } from "react";
import CloseAccountForm from "../../components/CloseAccountForm";
import Seo from "../../../common/Seo";

export default function CloseAccountPage(): ReactElement {
  return (
    <>
      <Seo title="Close Account" description="" />
      <CloseAccountForm />
    </>
  );
}
