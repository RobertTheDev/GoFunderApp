import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import { useQuery } from "@tanstack/react-query";
import { getFundraisers } from "../../service/fundraiser.service";
import FundraiserCard from "../../components/FundraiserCard";
import styles from "./styles.module.scss";
import FundraiserFilterMenu from "../../components/FundraiserFilterMenu";

export default function FundraisersPage(): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ["getFundraisersData"],
    queryFn: getFundraisers,
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return (
    <>
      <Seo title="Fundraisers" description="" />
      <FundraiserFilterMenu />
      <div className={styles.fundraiserCardsContainer}>
        {data.data.data.map((fundraiser) => {
          return <FundraiserCard fundraiser={fundraiser} key={fundraiser.id} />;
        })}
      </div>
    </>
  );
}
