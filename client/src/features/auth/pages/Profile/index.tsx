import axios from "axios";
import Seo from "../../../common/Seo";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import IUser from "../../../../interfaces/User";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function ProfilePage(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const { isPending, error, data } = useQuery<IUser | null>({
    queryKey: ["getProfileData"],
    queryFn: async () => {
      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user`,
        {
          withCredentials: true,
        }
      );

      return user.data.data;
    },
  });

  if (isPending) return <p>Loading...</p>;

  if (error) navigate("/");

  if (!data) navigate("/");

  return (
    <div>
      <Seo title={"Profile"} description="" />

      <p>{data?.email}</p>

      <img src={data?.image ? data.image : ""} alt="Avatart" />
    </div>
  );
}
