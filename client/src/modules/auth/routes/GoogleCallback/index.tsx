import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactElement } from "react";

export default function GoogleCallback(): ReactElement {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = hashParams.get("access_token");

  const { isPending, error, data } = useQuery({
    queryKey: ["getGoogleUserData"],
    queryFn: async () =>
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/auth/oauth/google/${accessToken}`
        )
        .then((res) => res.data.data),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return (
    <div>
      <p>Google Callback</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
