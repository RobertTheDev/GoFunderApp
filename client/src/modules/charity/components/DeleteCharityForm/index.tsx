import { ReactElement } from "react";
import useDeleteCharityForm from "./useDeleteCharityForm";

export default function DeleteCharityForm(): ReactElement {
  const { handledeleteCharity, message } = useDeleteCharityForm();
  return (
    <div>
      <p>Delete Charity Form</p>
      <button type="button" onClick={handledeleteCharity}>
        Delete
      </button>
      <p>{message?.content}</p>
    </div>
  );
}
