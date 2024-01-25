import { ReactElement } from "react";
import IFundraiser from "../../../../interfaces/Fundraiser";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { format } from "date-fns";

export default function FundraiserCard({
  fundraiser,
}: {
  fundraiser: IFundraiser;
}): ReactElement {
  return (
    <Link
      className={styles.cardContainer}
      to={`/fundraisers/${fundraiser.slug}`}
    >
      <div className={styles.cardImageContainer}>
        <img className={styles.cardImage} src={fundraiser.image} alt="ddd" />
      </div>
      <div className={styles.cardContentContainer}>
        <p className={styles.cardTitleText}>{fundraiser.name}</p>

        {fundraiser.deadlineDate && (
          <p>
            Closes at
            {format(new Date(fundraiser.deadlineDate).getDate(), "d MMMM yyyy")}
          </p>
        )}

        {/* <p>£{fundraiser.target.toLocaleString()}</p> */}
        <p>{fundraiser.category}</p>

        {/* <p>
          £{fundraiser.totalRaised.toLocaleString()} raised from{" "}
          {fundraiser.totalDonations} donations.
        </p> */}
      </div>
    </Link>
  );
}
