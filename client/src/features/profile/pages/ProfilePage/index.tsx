import Seo from "../../../common/Seo";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { getAuthenticatedUser } from "../../../auth/service/auth.service";

export default function ProfilePage(): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ["getProfileData"],
    queryFn: getAuthenticatedUser,
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>No</p>;

  const { email, image } = data.data.data;

  return (
    <>
      <Seo title={"Profile"} description="" />
      <div>
        <p>{email}</p>

        <img src={image ? image : ""} alt="Avatart" />
      </div>
    </>
  );
}
