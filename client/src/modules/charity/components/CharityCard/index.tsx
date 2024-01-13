import { Link } from "react-router-dom";
import ICharity from "../../../../interfaces/Charity";
import { ReactElement } from "react";

export default function CharityCard(charity: ICharity): ReactElement {
  return (
    <Link to={`/charities/${charity.id}`}>
      <div>
        <img
          style={{ height: 400, width: 400 }}
          src={charity.logo}
          alt={charity.name}
        />
        <p>{charity.name}</p>
      </div>
    </Link>
  );
}
