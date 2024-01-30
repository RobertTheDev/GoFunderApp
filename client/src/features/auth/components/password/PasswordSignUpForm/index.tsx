import { ReactElement, useContext } from 'react';
import usePasswordSignUp from './usePasswordSignUp';
import styles from './styles.module.scss';
import { AuthContext } from '../../../contexts/AuthContext/context';

export default function PasswordSignUpForm(): ReactElement {
  const { errors, handlePasswordSignUp, message, register } = usePasswordSignUp();

  const { toggleAuthModal } = useContext(AuthContext);

  return (
    <form className={styles.formContainer} onSubmit={handlePasswordSignUp}>
      <div className={styles.formInputContainer}>
        <input
          className={styles.formInput}
          {...register('email')}
          type="email"
          name="email"
          placeholder="Email"
        />
        {errors.email?.message && <p className={styles.formErrorText}>{errors.email.message}</p>}
      </div>

      <div className={styles.formInputContainer}>
        <input
          className={styles.formInput}
          {...register('name')}
          type="text"
          name="name"
          placeholder="Name"
        />
        {errors.name?.message && <p className={styles.formErrorText}>{errors.name.message}</p>}
      </div>

      <div className={styles.formInputContainer}>
        <input
          className={styles.formInput}
          {...register('password')}
          type="password"
          name="password"
          placeholder="Password"
        />

        {errors.password?.message && (
          <p className={styles.formErrorText}>{errors.password.message}</p>
        )}
      </div>

      {message && <p>{message.content}</p>}

      <div className={styles.formSubmitButtonContainer}>
        <button className={styles.formSubmitButton} type="submit">
          Sign Up
        </button>
        <p>Already have an account?</p>
        <p className={styles.formLink} onClick={() => toggleAuthModal(true, 'signIn')}>
          Signin now
        </p>
      </div>
    </form>
  );
}
