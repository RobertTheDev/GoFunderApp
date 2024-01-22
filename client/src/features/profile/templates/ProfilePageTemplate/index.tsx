import React, { ReactElement } from "react";
import IUser from "../../../../interfaces/User";

export default function ProfilePageTemplate({
  data,
}: {
  data: IUser;
}): ReactElement {
  return (
    <div>
      <p>{data?.email}</p>

      <img src={data?.image ? data.image : ""} alt="Avatart" />
    </div>
  );
}
