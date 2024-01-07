import { ReactElement } from "react";
import CreateCharityForm from "../../components/CreateCharityForm";

export default function CreateCharityRoute(): ReactElement {
  return (
    <div>
      <p>Create Charity</p>
      <CreateCharityForm />
    </div>
  );
}
