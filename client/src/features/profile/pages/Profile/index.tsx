import axios from "axios";
import Seo from "../../../common/Seo";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import IUser from "../../../../interfaces/User";
import ProfilePageTemplate from "../../templates/ProfilePageTemplate";

export default function ProfilePage(): ReactElement {
  const { isPending, error, data } = useQuery<IUser | null>({
    queryKey: ["getProfileData"],
    queryFn: async () => {
      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/user`,
        {
          withCredentials: true,
        }
      );

      return user.data.data;
    },
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>No</p>;

  if (data == null) return <p>No</p>;

  return (
    <>
      <Seo title={"Profile"} description="" />
      <ProfilePageTemplate data={data} />
    </>
  );
}
