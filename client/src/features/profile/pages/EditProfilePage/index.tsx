import { ReactElement } from "react";
import EditProfileForm from "../../components/EditProfileForm";
import Seo from "../../../common/Seo";

export default function EditProfilePage(): ReactElement {
  return (
    <>
      <Seo title="Edit Profile" description="" />
      <div>
        <EditProfileForm />
      </div>
    </>
  );
}
