import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFundraiserBySlug } from "../../service/fundraiser.service";
import { useParams } from "react-router-dom";
import { saveFundraiser } from "../../../savedFundraiser/service/savedFundraiser.service";
import CreateDonationForm from "../../../donation/components/CreateDonationForm";
import styles from "./styles.module.scss";

export default function FundraiserPage(): ReactElement {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["getFundraiserBySlugData"],
    queryFn: () => getFundraiserBySlug(String(slug)),
  });

  const mutation = useMutation({
    mutationFn: async (fundraiserId: string) => {
      return await saveFundraiser({ fundraiserId });
    },
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  if (data.data.data === null) return <p>Not found.</p>;

  return (
    <>
      <Seo title="Fundraiser" description="" />

      <div className={styles.pageContainer}>
        <div className={styles.fundraiserImageContainer}>
          <img
            className={styles.fundraiserImage}
            src={data.data.data.image}
            alt={data.data.data.name}
          />
        </div>
        <p>{data.data.data.name}</p>
        <p>{data.data.data.category}</p>

        <CreateDonationForm fundraiserId={data.data.data.id} />

        <button
          type="button"
          onClick={() => {
            if (data.data.data) {
              mutation.mutate(data.data.data.id);
            }
          }}
        >
          Save Fundraiser
        </button>

        <p>{new Date(data.data.data.createdAt).getDate()}</p>
        {data.data.data.deadlineDate && (
          <p>{new Date(data.data.data.deadlineDate).getDate()}</p>
        )}
        <p>{data.data.data.description}</p>
        <p>{data.data.data.headline}</p>
        <p>{data.data.data.target}</p>
        <p>{data.data.data.totalDonations}</p>
        <p>{data.data.data.totalRaised}</p>
        <h3>Donations</h3>
      </div>
    </>
  );
}
