import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ICharity from "../../../../interfaces/Charity";
import axios from "axios";
import Seo from "../../../seo/components/Seo";

export default function CharityRoute() {
  const { id } = useParams();

  const [charity, setCharity] = useState<ICharity | null>(null);

  const getCharity = useCallback(
    async function () {
      try {
        const charity = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/charities/${id}`
        );

        setCharity(charity.data.data);
      } catch (error) {
        console.error(error);
      }
    },
    [id]
  );

  useEffect(() => {
    getCharity();
  }, [getCharity]);

  return (
    <div>
      {charity ? (
        <div>
          <Seo title={charity.name} />
          <Link to={"update"}>Update Charity</Link>
          <Link to={"delete"}>Delete Charity</Link>
          <p>{charity.name}</p>
          <p>{charity.description}</p>
          <img src={charity.logoUrl} alt={charity.name} />
        </div>
      ) : (
        <div>
          <Seo title="No Charity Found" />
          <p>No charity found</p>
        </div>
      )}
    </div>
  );
}
