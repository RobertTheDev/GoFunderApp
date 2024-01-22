import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import UserOwnedCharitiesPageTemplate from "../../templates/UserOwnedCharitiesPageTemplate";

export default function UserOwnedCharitiesPage(): ReactElement {
  return (
    <>
      <Seo title="My Charities" description="" />
      <UserOwnedCharitiesPageTemplate />
    </>
  );
}
