import { ReactElement } from "react";

export default function GithubPage(): ReactElement {
  return (
    <div>
      <p>Github</p>
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
    </div>
  );
}
