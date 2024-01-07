import axios from "axios";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";

export default function DeleteCharityForm(): ReactElement {
  const { id } = useParams();

  async function handleDeleteCharity() {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/charities/${id}/delete`
    );
  }

  return (
    <div>
      <p>Delete Charity Form</p>
      <button type="button" onClick={handleDeleteCharity}>
        Delete
      </button>
    </div>
  );
}
