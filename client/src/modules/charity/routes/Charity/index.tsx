import { useParams } from "react-router-dom";

export default function CharityRoute() {
  const { id } = useParams();

  return (
    <div>
      <p>Charity {id}</p>
    </div>
  );
}
