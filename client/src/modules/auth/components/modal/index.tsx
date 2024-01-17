import { ReactElement } from "react";
import styles from "./styles.module.scss";

export default function AuthModal(): ReactElement {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <p>Auth</p>
        <button type="button">Close</button>
      </div>
    </div>
  );
}
