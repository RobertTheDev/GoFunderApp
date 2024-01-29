import { ReactElement } from "react";
import Seo from "../../../common/Seo";

export default function NotFoundPage(): ReactElement {
  return (
    <>
      <Seo title="404 - Not Found" description="" />
      <div>
        <p>404 - Page Not Found.</p>
      </div>
    </>
  );
}
