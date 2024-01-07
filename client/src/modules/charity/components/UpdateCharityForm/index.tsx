import axios from "axios";
import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateCharityForm(): ReactElement {
  const [updateCharityForm, setUpdateCharityForm] = useState({
    category: "",
    name: "",
    logoUrl: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = e;
    const { name, value } = target;

    setUpdateCharityForm({
      ...updateCharityForm,
      [name]: value,
    });
  };

  const { id } = useParams();

  async function updateCharity() {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/charities/${id}/update`,
        updateCharityForm
      );
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCharity();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={updateCharityForm.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={updateCharityForm.description}
        onChange={handleChange}
        required
      />
      <label htmlFor="logoUrl">Logo URL</label>
      <input
        type="url"
        name="logoUrl"
        value={updateCharityForm.logoUrl}
        onChange={handleChange}
        required
      />

      <label htmlFor="category">Category</label>
      <input
        type="text"
        name="category"
        value={updateCharityForm.category}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Charity</button>
    </form>
  );
}
