import axios from "axios";
import { ReactElement, useState } from "react";

export default function CreateCharityForm(): ReactElement {
  const [charityForm, setCharityForm] = useState({
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

    setCharityForm({
      ...charityForm,
      [name]: value,
    });
  };

  async function createCharity() {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/charities/create`,
        charityForm
      );
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCharity();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={charityForm.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={charityForm.description}
        onChange={handleChange}
        required
      />
      <label htmlFor="logoUrl">Logo URL</label>
      <input
        type="url"
        name="logoUrl"
        value={charityForm.logoUrl}
        onChange={handleChange}
        required
      />

      <label htmlFor="category">Category</label>
      <input
        type="text"
        name="category"
        value={charityForm.category}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Charity</button>
    </form>
  );
}
