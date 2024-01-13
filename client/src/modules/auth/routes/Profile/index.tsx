import axios from "axios";
import Seo from "../../../seo/components/Seo";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import IUser from "../../../../interfaces/User";

export default function ProfileRoute(): ReactElement {
  const { isPending, error, data } = useQuery<IUser | null>({
    queryKey: ["getProfileData"],
    queryFn: async () =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/auth/user`, {
          withCredentials: true,
        })
        .then((res) => res.data.user),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  if (!data) return <p>No user found.</p>;

  async function signOut() {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/sign-out`, {
      withCredentials: true,
    });
  }

  return (
    <div>
      <Seo title={"Profile"} />

      <p>{data.email}</p>

      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
