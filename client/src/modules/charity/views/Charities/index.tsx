import { ReactElement } from "react";
import CharityCard from "../../components/CharityCard";
import Seo from "../../../seo/components/Seo";
import { useQuery } from "@tanstack/react-query";
import { getCharities } from "../../service/charity.service";
import styles from "./styles.module.scss";

export default function CharitiesRoute(): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ["getCharitiesData"],
    queryFn: getCharities,
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return (
    <>
      <Seo title="Charities" />

      <div className={styles.cardsContainer}>
        {data.data.data.map((charity) => {
          return <CharityCard {...charity} key={charity.id} />;
        })}
      </div>
    </>
  );
}
