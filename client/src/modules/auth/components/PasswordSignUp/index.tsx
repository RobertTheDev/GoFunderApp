import { ReactElement } from "react";
import usePasswordSignUp from "./usePasswordSignUp";
import styles from "./styles.module.css";

export default function PasswordSignUpForm(): ReactElement {
  const { errors, handlePasswordSignUp, errorMessage, register } =
    usePasswordSignUp();

  return (
    <div data-testid="password-sign-up-form">
      <p>Hello World</p>

      <form className={styles.formContainer} onSubmit={handlePasswordSignUp}>
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" name="email" />
        {errors.email?.message && <p>{errors.email.message}</p>}

        <label htmlFor="name">Name</label>
        <input {...register("name")} type="text" name="name" />
        {errors.name?.message && <p>{errors.name.message}</p>}

        <label htmlFor="password">Password</label>
        <input {...register("password")} type="password" name="password" />
        {errors.password?.message && <p>{errors.password.message}</p>}

        <p>{errorMessage}</p>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
