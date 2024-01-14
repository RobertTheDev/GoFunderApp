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
    </div>
  );
}
