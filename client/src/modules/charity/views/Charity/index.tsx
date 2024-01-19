import { Link, useParams } from "react-router-dom";
import Seo from "../../../seo/components/Seo";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { getCharityById } from "../../service/charity.service";

export default function CharityRoute(): ReactElement {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["getCharityData"],
    queryFn: () => getCharityById(String(id)),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  if (!data.data.data) return <p>No charity found.</p>;

  return (
    <div>
      <Seo title={data.data.data.name} />
      <Link to={"update"}>Update Charity</Link>
      <Link to={"delete"}>Delete Charity</Link>
      <p>{data.data.data.name}</p>
      <p>{data.data.data.description}</p>
      <img src={data.data.data.logo} alt={data.data.data.name} />
    </div>
  );
}
