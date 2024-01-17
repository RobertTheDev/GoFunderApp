import { ReactElement } from "react";
import axios from "axios";
import Seo from "../../../seo/components/Seo";
import { useQuery } from "@tanstack/react-query";
import IUser from "../../../../interfaces/User";
import { Link } from "react-router-dom";

export default function UsersRoute(): ReactElement {
  const { isPending, error, data } = useQuery<IUser[]>({
    queryKey: ["getUsersData"],
    queryFn: async () =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/users`)
        .then((res) => res.data.data),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return (
    <div>
      <Seo title="Users" />
      {data.map((user) => {
        return (
          <Link to={`/users/${user.id}`} key={user.id}>
            <div>
              <img
                src={user.image ? user.image : ""}
                alt={user.name}
                style={{ height: 200, width: 200 }}
              />
              <p>{user.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
