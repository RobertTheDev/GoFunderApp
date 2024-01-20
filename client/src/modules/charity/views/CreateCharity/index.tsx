import { ReactElement } from "react";
import CreateCharityForm from "../../components/CreateCharityForm";
import Seo from "../../../common/Seo";

export default function CreateCharityRoute(): ReactElement {
  return (
    <div>
      <Seo title="Create Charity" />
      <p>Create Charity</p>
      <CreateCharityForm />
    </div>
  );
}
