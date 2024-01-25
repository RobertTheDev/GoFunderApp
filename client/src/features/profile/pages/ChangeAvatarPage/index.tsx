import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import ChangeAvatarForm from "../../components/ChangeAvatarForm";

export default function ChangeAvatarPage(): ReactElement {
  return (
    <>
      <Seo title="Change Avatar" description="" />
      <div>
        <ChangeAvatarForm />
      </div>
    </>
  );
}
