import { ReactElement } from "react";
import ICharity from "../../../../interfaces/Charity";
import { Link } from "react-router-dom";
import Seo from "../../../seo/components/Seo";

export default function CharityTemplate({
  charity,
}: {
  charity: ICharity | null;
}): ReactElement {
  if (charity == null) {
    return <p>No charity found.</p>;
  }

  return (
    <div>
      <Seo title={charity.name} />
      <Link to={"update"}>Update Charity</Link>
      <Link to={"delete"}>Delete Charity</Link>
      <p>{charity.name}</p>
      <p>{charity.category}</p>
      <img src={charity.logo} alt={charity.name} />
      <p>{new Date(charity.createdAt).getDate()}</p>
      <p>{charity.description}</p>
      <h3>Fundraisers</h3>
      {charity.fundraisers.length === 0 ? (
        <p>{`${charity.name} has not currently set up any fundraisers yet.`}</p>
      ) : (
        charity.fundraisers.map((fundraiser) => {
          return (
            <div>
              <p>{fundraiser.name}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
