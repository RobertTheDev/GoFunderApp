import { ReactElement } from "react";
import IFundraiser from "../../../../interfaces/Fundraiser";

export default function FundraiserTemplate({
  fundraiser,
}: {
  fundraiser: IFundraiser | null;
}): ReactElement {
  if (fundraiser == null) {
    return <p>noo</p>;
  }

  return (
    <div>
      <p>{fundraiser.name}</p>
      <p>{fundraiser.category}</p>
      <img src={fundraiser.image} alt={fundraiser.name} />
      <p>{new Date(fundraiser.createdAt).getDate()}</p>
      {fundraiser.deadlineDate && (
        <p>{new Date(fundraiser.deadlineDate).getDate()}</p>
      )}
      <p>{fundraiser.description}</p>
      <p>{fundraiser.headline}</p>
      <p>{fundraiser.target}</p>
      <p>{fundraiser.totalDonations}</p>
      <p>{fundraiser.totalRaised}</p>
      <h3>Donations</h3>
      {fundraiser.donations.map((donation) => {
        return (
          <div key={donation.amount}>
            <p>{donation.amount}</p>
          </div>
        );
      })}
    </div>
  );
}
