import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import UserFollowedCharitiesPageTemplate from "../../templates/UserFollowedCharitiesPageTemplate";

export default function UserFollowedCharitiesPage(): ReactElement {
  return (
    <>
      <Seo title="Followed Charities" description="" />
      <UserFollowedCharitiesPageTemplate />
    </>
  );
}
