import { ReactElement, useContext } from "react";
import usePasswordSignInForm from "./usePasswordSignInForm";
import styles from "./styles.module.scss";
import { AuthContext } from "../../../contexts/AuthContext/context";

export default function PasswordSignInForm(): ReactElement {
  const { register, handleSignIn, errors, errorMessage } =
    usePasswordSignInForm();

  const { toggleAuthModal } = useContext(AuthContext);

  return (
    <form className={styles.formContainer} onSubmit={handleSignIn}>
      <div className={styles.formInputContainer}>
        <input
          className={styles.formInput}
          {...register("email")}
          type="email"
          name="email"
          placeholder="Email"
        />
        {errors.email?.message && (
          <p className={styles.formErrorText}>{errors.email.message}</p>
        )}
      </div>

      <div className={styles.formInputContainer}>
        <input
          className={styles.formInput}
          {...register("password")}
          type="password"
          name="password"
          placeholder="Password"
        />

        <p
          className={styles.formLink}
          onClick={() => toggleAuthModal(true, "forgotPassword")}
        >
          Forgot password?
        </p>

        {errors.password?.message && (
          <p className={styles.formErrorText}>{errors.password.message}</p>
        )}
      </div>

      {errorMessage && <p className={styles.formErrorText}>{errorMessage}</p>}
      <div className={styles.formSubmitButtonContainer}>
        <button className={styles.formSubmitButton} type="submit">
          Sign In
        </button>
        <p>Don't have an account?</p>
        <p
          className={styles.formLink}
          onClick={() => toggleAuthModal(true, "signUp")}
        >
          Signup now
        </p>
      </div>
    </form>
  );
}
