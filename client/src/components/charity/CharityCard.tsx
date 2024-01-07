import ICharity from "../../interfaces/Charity";
import { ReactElement } from "react";

export default function CharityCard(charity: ICharity): ReactElement {
  return (
    <div>
      <img
        style={{ height: 400, width: 400 }}
        src={charity.logoUrl}
        alt={charity.name}
      />
      <p>{charity.name}</p>
    </div>
  );
}
