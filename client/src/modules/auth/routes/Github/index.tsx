import axios from "axios";
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
    </div>
  );
}
