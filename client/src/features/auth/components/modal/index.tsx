import { ReactElement, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/AuthContext/context";
import { useOnClickOutside } from "usehooks-ts";
import PasswordSignInForm from "../password/PasswordSignIn";
import PasswordSignUpForm from "../password/PasswordSignUpForm";
import TotpSetupForm from "../totp/TotpSetupForm";
import PasswordSendResetForm from "../password/PasswordSendResetForm";

export default function AuthModal(): ReactElement {
  const { authModal, toggleAuthModal } = useContext(AuthContext);

  const authModalRef = useRef<HTMLDivElement>(null);

  const handleToggleAuthModal: () => void = () => {
    toggleAuthModal(!authModal.active, null);
  };

  useOnClickOutside(authModalRef, handleToggleAuthModal);

  return (
    <div className={styles.modalWrapper}>
      <div ref={authModalRef} className={styles.modalContainer}>
        <p>Auth</p>
        <button type="button" onClick={handleToggleAuthModal}>
          Close
        </button>
        <button type="button" onClick={() => toggleAuthModal(true, "signIn")}>
          Sign In
        </button>
        <button type="button" onClick={() => toggleAuthModal(true, "signUp")}>
          Sign Up
        </button>
        {authModal.formType === "signIn" && <PasswordSignInForm />}
        {authModal.formType === "signUp" && <PasswordSignUpForm />}
        {authModal.formType === "setUpTotp" && <TotpSetupForm />}
        {authModal.formType === "forgotPassword" && <PasswordSendResetForm />}
      </div>
    </div>
  );
}
