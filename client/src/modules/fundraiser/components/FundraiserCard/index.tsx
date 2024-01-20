import { ReactElement } from "react";
import IFundraiser from "../../../../interfaces/Fundraiser";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { format } from "date-fns";

export default function FundraiserCard(fundraiser: IFundraiser): ReactElement {
  return (
    <Link className={styles.cardContainer} to={`/fundraisers/${fundraiser.id}`}>
      <img
        className={styles.cardImageContainer}
        src={fundraiser.image}
        alt="ddd"
      />
      <p>{fundraiser.name}</p>
      <p>
        Closes on{" "}
        {format(new Date(fundraiser.deadlineDate).getDate(), "d MMMM yyyy")}
      </p>
      <p>
        Created on{" "}
        {format(new Date(fundraiser.createdAt).getDate(), "d MMMM yyyy")}
      </p>
      <p>£{fundraiser.target.toLocaleString()}</p>
      <p>{fundraiser.category}</p>

      <p>{fundraiser.headline}</p>

      <p>
        £{fundraiser.totalRaised.toLocaleString()} raised from{" "}
        {fundraiser.totalDonations} donations.
      </p>
    </Link>
  );
}
