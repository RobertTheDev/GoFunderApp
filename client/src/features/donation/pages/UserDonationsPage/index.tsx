import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import { useQuery } from "@tanstack/react-query";
import { getDonationsByCurrentUser } from "../../service/donation.service";

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
        return (
          <div key={donation.id}>
            <p>{donation.message}</p>
          </div>
        );
      })}
    </>
  );
}
