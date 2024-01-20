import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { getCharityById } from "../../service/charity.service";
import CharityTemplate from "../../templates/CharityTemplate";

export default function CharityPage(): ReactElement {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["getCharityData"],
    queryFn: () => getCharityById(String(id)),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return <CharityTemplate charity={data.data.data} />;
}
