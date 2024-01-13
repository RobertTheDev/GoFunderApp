import { Link, useParams } from "react-router-dom";
import ICharity from "../../../../interfaces/Charity";
import axios from "axios";
import Seo from "../../../seo/components/Seo";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

export default function CharityRoute(): ReactElement {
  const { id } = useParams();

  const { isPending, error, data } = useQuery<ICharity | null>({
    queryKey: ["getCharityData"],
    queryFn: async () =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/charities/${id}`)
        .then((res) => res.data.data),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  if (!data) return <p>No charity found.</p>;

  return (
    <div>
      <Seo title={data.name} />
      <Link to={"update"}>Update Charity</Link>
      <Link to={"delete"}>Delete Charity</Link>
      <p>{data.name}</p>
      <p>{data.description}</p>
      <img src={data.logo} alt={data.name} />
    </div>
  );
}
