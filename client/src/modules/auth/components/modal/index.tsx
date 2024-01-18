import { ReactElement, useContext } from "react";
import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/AuthContext/context";

export default function AuthModal(): ReactElement {
  const { toggleAuthModal } = useContext(AuthContext);

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <p>Auth</p>
        <button type="button" onClick={() => toggleAuthModal(null)}>
          Close
        </button>
      </div>
    </div>
  );
}
