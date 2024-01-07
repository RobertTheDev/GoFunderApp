import { ReactElement } from "react";
import axios from "axios";
import CharityCard from "../../components/CharityCard";
import ICharity from "../../../../interfaces/Charity";
import Seo from "../../../seo/components/Seo";
import { useQuery } from "@tanstack/react-query";

export default function CharitiesRoute(): ReactElement {
  const { isPending, error, data } = useQuery<ICharity[]>({
    queryKey: ["getCharitiesData"],
    queryFn: async () =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/charities`)
        .then((res) => res.data.data),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return (
    <div>
      <Seo title="Charities" />
      {data.map((charity) => {
        return <CharityCard {...charity} key={charity.id} />;
      })}
    </div>
  );
}
