import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function AmazonCallback() {
  const [searchParams] = useSearchParams();

  const amazonCode = searchParams.get("code");

  const { isPending, error, data } = useQuery({
    queryKey: ["getAmazonUserData"],
    queryFn: async () =>
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/auth/oauth/amazon/${amazonCode}`
        )
        .then((res) => res.data.data),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return (
    <div>
      <p>Amazon Callback</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
