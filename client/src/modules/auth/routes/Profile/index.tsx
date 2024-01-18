import axios from "axios";
import Seo from "../../../seo/components/Seo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactElement } from "react";
import IUser from "../../../../interfaces/User";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function ProfileRoute(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  async function signOut() {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/sign-out`,
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/");

      window.location.reload();
    } catch (error: any) {
      console.error("Sign-out error:", error);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getProfileData"] });
    },
    onError: () => {
      console.log("error");
    },
  });

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
      <Seo title={"Profile"} />

      <p>{data?.email}</p>

      <img src={data?.image ? data.image : ""} alt="Avatart" />

      <button onClick={() => mutation.mutate()}>Sign Out</button>
    </div>
  );
}
