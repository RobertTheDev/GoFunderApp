import { Link, useParams } from "react-router-dom";
import ICharity from "../../../../interfaces/Charity";
import Seo from "../../../seo/components/Seo";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { getCharityById } from "../../service/charity.service";

export default function CharityRoute(): ReactElement {
  const { id } = useParams();

  const { isPending, error, data } = useQuery<ICharity | null>({
    queryKey: ["getCharityData"],
    queryFn: () => getCharityById(id),
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
