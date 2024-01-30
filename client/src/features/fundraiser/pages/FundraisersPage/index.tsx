import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import { useQuery } from "@tanstack/react-query";
import { getFundraisers } from "../../service/fundraiser.service";
import FundraiserCard from "../../components/FundraiserCard";
import styles from "./styles.module.scss";

export default function FundraisersPage(): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ["getFundraisersData"],
    queryFn: getFundraisers,
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred.</p>;

  return (
    <>
      <Seo
        title="Fundraisers"
        description={`
        This page displays fundraisers set up on GoFunder
         and allows users to filter and find fundraisers by 
         category, relevance, and time of listing.
        `}
      />

      {data.data.data.length > 0 ? (
        <div className={styles.fundraiserCardsContainer}>
          {data.data.data.map((fundraiser) => {
            return (
              <FundraiserCard fundraiser={fundraiser} key={fundraiser.id} />
            );
          })}
        </div>
      ) : (
        <p>No fundraisers found.</p>
      )}
    </>
  );
}
