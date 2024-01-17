import { useParams } from "react-router-dom";
import axios from "axios";
import Seo from "../../../seo/components/Seo";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import IUser from "../../../../interfaces/User";

export default function UserRoute(): ReactElement {
  const { id } = useParams();

  const { isPending, error, data } = useQuery<IUser | null>({
    queryKey: ["getUserData"],
    queryFn: async () =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/users/${id}`)
        .then((res) => res.data.data),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  if (!data) return <p>No user found.</p>;

  return (
    <div>
      <Seo title={`${data.name}`} />

      <p>{data.name}</p>

      <img
        style={{
          height: 300,
          width: 300,
        }}
        src={data.image ? data.image : ""}
        alt={"Profile avatar"}
      />
    </div>
  );
}
