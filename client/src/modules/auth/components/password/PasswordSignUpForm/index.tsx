import { ReactElement } from "react";
import usePasswordSignUp from "./usePasswordSignUp";
import styles from "./styles.module.css";

export default function PasswordSignUpForm(): ReactElement {
  const { errors, handlePasswordSignUp, message, register } =
    usePasswordSignUp();

  return (
    <div>
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

        {message && <p>{message.content}</p>}

        <a
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}
        >
          Github
        </a>

        <a
          href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/google/callback&response_type=token&scope=profile`}
        >
          Google
        </a>

        <a
          href={`https://www.amazon.com/ap/oa?client_id=${process.env.REACT_APP_AMAZON_CLIENT_ID}&scope=profile&response_type=code&redirect_uri=http://localhost:3000/auth/amazon/callback`}
        >
          Amazon
        </a>

        <a
          href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_X_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/callback/twitter&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`}
        >
          X
        </a>
        <a
          href={`https://www.facebook.com/v18.0/dialog/oauth?client_id=939909000888499&redirect_uri=http://localhost:3000/auth/facebook/callback`}
        >
          Facebook
        </a>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
