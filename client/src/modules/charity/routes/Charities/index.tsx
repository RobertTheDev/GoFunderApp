import { useEffect, useState, ReactElement } from "react";
import axios from "axios";
import CharityCard from "../../components/CharityCard";
import ICharity from "../../../../interfaces/Charity";

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
      {charities.map((charity) => {
        return <CharityCard {...charity} key={charity.id} />;
      })}
    </div>
  );
}
