import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [charities, setCharities] = useState<{ name: string }[]>([]);

  async function getCharities() {
    try {
      const charities = await axios.get(
        `${process.env.REACT_APP_API_URL}/charities`
      );

      setCharities(charities.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCharities();
  }, []);

  return (
    <div>
      <p>{JSON.stringify(charities)}</p>
    </div>
  );
}

export default App;
