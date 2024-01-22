import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import { useQuery } from "@tanstack/react-query";
import { getFundraiserBySlug } from "../../service/fundraiser.service";
import { useParams } from "react-router-dom";
import FundraiserTemplate from "../../templates/FundraiserTemplate";

export default function FundraiserPage(): ReactElement {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["getFundraiserBySlugData"],
    queryFn: () => getFundraiserBySlug(String(slug)),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return (
    <>
      <Seo title="Fundraiser" description="" />
      <FundraiserTemplate fundraiser={data.data.data} />
    </>
  );
}
