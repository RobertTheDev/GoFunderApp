import { ReactElement } from "react";
import Seo from "../../../common/Seo";

export default function UnauthorizedPage(): ReactElement {
  return (
    <>
      <Seo
        title="Unauthorized"
        description={`
        The page you tried to access returned a 403 error 
        meaning that you are not authorized as you are 
        not the owner of the entity and cannot make 
        requests on its behalf.
      `}
      />
      <div>
        <p>Unauthorized.</p>
      </div>
    </>
  );
}
