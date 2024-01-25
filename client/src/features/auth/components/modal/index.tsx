import { ReactElement, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/AuthContext/context";
import { useOnClickOutside } from "usehooks-ts";
import PasswordSignInForm from "../password/PasswordSignInForm";
import PasswordSignUpForm from "../password/PasswordSignUpForm";
import TotpSetupForm from "../totp/TotpSetupForm";
import PasswordSendResetForm from "../password/PasswordSendResetForm";
import { FaTimes } from "react-icons/fa";

export default function AuthModal(): ReactElement {
  const { authModal, toggleAuthModal } = useContext(AuthContext);

  const authModalRef = useRef<HTMLDivElement>(null);

  const handleToggleAuthModal: () => void = () => {
    toggleAuthModal(!authModal.active, null);
  };

  useOnClickOutside(authModalRef, handleToggleAuthModal);

  return (
    <div className={styles.modalWrapper}>
      <div>
        <div ref={authModalRef} className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderTextContainer}>
              <p className={styles.modalHeaderText}>Sign In</p>
            </div>
            <button
              type="button"
              className={styles.modalCloseButton}
              onClick={handleToggleAuthModal}
            >
              <FaTimes />
            </button>
          </div>
          {authModal.formType === "signIn" && <PasswordSignInForm />}
          {authModal.formType === "signUp" && <PasswordSignUpForm />}
          {authModal.formType === "setUpTotp" && <TotpSetupForm />}
          {authModal.formType === "forgotPassword" && <PasswordSendResetForm />}
        </div>
      </div>
    </div>
  );
}
