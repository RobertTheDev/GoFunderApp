import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import { useQuery } from "@tanstack/react-query";
import { getDonationsByCurrentUser } from "../../service/donation.service";
import DonationCard from "../../components/DonationCard";

export default function UserDonationsPage(): ReactElement {
  const { isPending, error, data } = useQuery({
    queryKey: ["getDonationsByCurrentUserData"],
    queryFn: getDonationsByCurrentUser,
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  return (
    <>
      <Seo title="My Donations" description="" />

      {data.data.data.map((donation) => {
        return <DonationCard key={donation.id} donation={donation} />;
      })}
    </>
  );
}
