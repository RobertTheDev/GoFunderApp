import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { getFundraisersByCategory } from "../../../fundraiser/service/fundraiser.service";
import FundraiserCard from "../../../fundraiser/components/FundraiserCard";

export default function CategoryFundraiserSection({
  category,
}: {
  category: string;
}): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ["getFundraisersByCategoryData"],
    queryFn: () => getFundraisersByCategory(category),
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return (
    <div>
      <h3>{category}</h3>
      {data.data.data.map((fundraiser) => {
        return <FundraiserCard key={fundraiser.id} {...fundraiser} />;
      })}
    </div>
  );
}
