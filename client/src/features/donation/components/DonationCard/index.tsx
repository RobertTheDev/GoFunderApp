import { ReactElement } from "react";
import IDonation from "../../../../interfaces/Donation";

export default function DonationCard({
  donation,
}: {
  donation: IDonation;
}): ReactElement {
  return (
    <div>
      <p>{donation.amount}</p>
      <p>{donation.message}</p>
      <p>{donation.id}</p>
    </div>
  );
}
