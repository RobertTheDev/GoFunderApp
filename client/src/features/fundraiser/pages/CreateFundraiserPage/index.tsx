import { ReactElement } from "react";
import CreateFundraiserForm from "../../components/CreateFundraiserForm";
import Seo from "../../../common/Seo";
import styles from "./styles.module.scss";

export default function CreateFundraiserPage(): ReactElement {
  return (
    <div className={styles.pageContainer}>
      <Seo title="Create Fundraiser" description="" />
      <p>Create Fundraiser</p>
      <CreateFundraiserForm />
    </div>
  );
}