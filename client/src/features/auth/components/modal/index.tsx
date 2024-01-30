import { ReactElement, useContext, useRef } from 'react';
import styles from './styles.module.scss';
import { AuthContext } from '../../contexts/AuthContext/context';
import { useOnClickOutside } from 'usehooks-ts';
import PasswordSignInForm from '../password/PasswordSignInForm';
import PasswordSignUpForm from '../password/PasswordSignUpForm';
import TotpSetupForm from '../totp/TotpSetupForm';
import PasswordSendResetForm from '../password/PasswordSendResetForm';
import { FaTimes } from 'react-icons/fa';
import { AuthContextType } from '../../contexts/AuthContext/AuthContextType';
import { motion } from 'framer-motion';

export default function AuthModal(): ReactElement {
  const { authModal, toggleAuthModal } = useContext<AuthContextType>(AuthContext);

  const authModalRef: React.RefObject<HTMLDivElement> = useRef(null);

  const handleToggleAuthModal: () => void = () => {
    toggleAuthModal(!authModal.active, null);
  };

  useOnClickOutside(authModalRef, handleToggleAuthModal);

  return (
    <div className={styles.modalWrapper}>
      <div>
        <motion.div
          animate={{ y: 0 }}
          initial={{ y: 150 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
          ref={authModalRef}
          className={styles.modalContainer}
        >
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderTextContainer}>
              <p className={styles.modalHeaderText}>
                {authModal.formType === 'signIn' && <p>Sign In</p>}
                {authModal.formType === 'signUp' && <p>Sign Up</p>}
                {authModal.formType === 'setUpTotp' && <p>(Optional) Set Up MFA</p>}
                {authModal.formType === 'forgotPassword' && <p>Forgot Password</p>}
              </p>
            </div>
            <button
              type="button"
              className={styles.modalCloseButton}
              onClick={handleToggleAuthModal}
            >
              <FaTimes />
            </button>
          </div>
          {authModal.formType === 'signIn' && <PasswordSignInForm />}
          {authModal.formType === 'signUp' && <PasswordSignUpForm />}
          {authModal.formType === 'setUpTotp' && <TotpSetupForm />}
          {authModal.formType === 'forgotPassword' && <PasswordSendResetForm />}
        </motion.div>
      </div>
    </div>
  );
}
