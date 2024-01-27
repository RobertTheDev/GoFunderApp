import { ReactElement } from "react";
import styles from "./styles.module.scss";
import useResetPassword from "./useResetPassword";

export default function PasswordResetForm(): ReactElement {
  const { register, handleResetPassword, errors, message } = useResetPassword();

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleResetPassword}>
        <div className={styles.formInputContainer}>
          <h1>Reset Password</h1>
          <p>Change your password using the form below.</p>
          <input
            className={styles.formInput}
            {...register("password")}
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
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
