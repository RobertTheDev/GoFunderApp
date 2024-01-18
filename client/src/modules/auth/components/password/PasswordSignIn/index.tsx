import { ReactElement } from "react";
import usePasswordSignInForm from "./usePasswordSignInForm";
import OauthButtons from "../../oauth/OauthButtons";

export default function PasswordSignInForm(): ReactElement {
  const { register, handleSignIn, errors, errorMessage } =
    usePasswordSignInForm();

  return (
    <form onSubmit={handleSignIn}>
      <label htmlFor="email">Email</label>
      <input {...register("email")} type="email" name="email" />
      {errors.email?.message && <p>{errors.email.message}</p>}
      <label htmlFor="password">Password</label>
      <input {...register("password")} type="password" name="password" />
      {errors.password?.message && <p>{errors.password.message}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <OauthButtons />
      <button type="submit">Sign In</button>
    </form>
  );
}
