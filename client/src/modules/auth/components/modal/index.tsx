import { ReactElement, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/AuthContext/context";
import { useOnClickOutside } from "usehooks-ts";

export default function AuthModal(): ReactElement {
  const { toggleAuthModal } = useContext(AuthContext);

  const authModalRef = useRef<HTMLDivElement>(null);

  const handleToggleAuthModal: () => void = () => {
    toggleAuthModal(null);
  };

  useOnClickOutside(authModalRef, handleToggleAuthModal);

  return (
    <div className={styles.modalWrapper}>
      <div ref={authModalRef} className={styles.modalContainer}>
        <p>Auth</p>
        <button type="button" onClick={handleToggleAuthModal}>
          Close
        </button>
      </div>
    </div>
  );
}
