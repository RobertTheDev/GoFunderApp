import { ReactElement } from "react";
import Seo from "../../../common/Seo";

export default function UnauthenticatedPage(): ReactElement {
  return (
    <>
      <Seo title="Unauthenticated" description="" />
      <div>
        <p>Unauthenticated.</p>
      </div>
    </>
  );
}
