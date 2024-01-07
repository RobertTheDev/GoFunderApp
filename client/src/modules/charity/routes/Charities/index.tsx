import { useEffect, useState, ReactElement } from "react";
import axios from "axios";
import CharityCard from "../../components/CharityCard";
import ICharity from "../../../../interfaces/Charity";
import Seo from "../../../seo/components/Seo";

export default function CharitiesRoute(): ReactElement {
  const [charities, setCharities] = useState<ICharity[]>([]);

  async function getCharities(): Promise<void> {
    try {
      const charities = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/charities`
      );

      setCharities(charities.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCharities();
  }, []);

  return (
    <div>
      <Seo title="Charities" />
      {charities.map((charity) => {
        return <CharityCard {...charity} key={charity.id} />;
      })}
    </div>
  );
}
