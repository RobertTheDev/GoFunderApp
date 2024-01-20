import { Link } from "react-router-dom";
import ICharity from "../../../../interfaces/Charity";
import { ReactElement } from "react";
import { format } from "date-fns";
import styles from "./styles.module.scss";

export default function CharityCard(charity: ICharity): ReactElement {
  return (
    <Link to={`/charities/${charity.id}`} className={styles.cardContainer}>
      <img
        className={styles.cardImageContainer}
        src={charity.logo}
        alt={charity.name}
      />
      <p>{charity.name}</p>
      <p>{charity.category}</p>
      <p>
        GoFunder charity since{" "}
        {format(new Date(charity.createdAt), "dd MMMM yyyy")}
      </p>
      <div>
        <button type="button">Follow</button>
        <button type="button">View</button>
      </div>
    </Link>
  );
}
