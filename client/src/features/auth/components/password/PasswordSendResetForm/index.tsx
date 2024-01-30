import { ReactElement, useContext } from 'react';
import usePasswordSignUp from './usePasswordSendReset';
import styles from './styles.module.scss';
import { AuthContext } from '../../../contexts/AuthContext/context';

export default function PasswordSendResetForm(): ReactElement {
  const { errors, handleSendPasswordReset, message, register } = usePasswordSignUp();

  const { toggleAuthModal } = useContext(AuthContext);

  return (
    <form className={styles.formContainer} onSubmit={handleSendPasswordReset}>
      <div className={styles.formInputContainer}>
        <p>
          Enter your email address and we will send you an email that will allow you to reset your
          password.
        </p>
        <input
          className={styles.formInput}
          {...register('email')}
          type="email"
          name="email"
          placeholder="Email"
        />
        {errors.email?.message && <p className={styles.formErrorText}>{errors.email.message}</p>}
      </div>

      {message && <p>{message.content}</p>}

      <div className={styles.formSubmitButtonContainer}>
        <button className={styles.formSubmitButton} type="submit">
          Send Password Reset
        </button>
        <p>Already have an account?</p>
        <p className={styles.formLink} onClick={() => toggleAuthModal(true, 'signIn')}>
          Signin now
        </p>
      </div>
    </form>
  );
}
