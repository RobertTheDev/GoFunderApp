import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import NotificationsPageTemplate from "../../templates/NotificationsPageTemplate";

export default function NotificationsPage(): ReactElement {
  return (
    <>
      <Seo title="Notifications" description="" />
      <NotificationsPageTemplate />
    </>
  );
}
