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
    </div>
  );

  // Client ID:amzn1.application-oa2-client.c6fefb9253df403f871ac057ffe385c0

  // Client Secret:amzn1.oa2-cs.v1.f0f9858bf8401fb3b1fb61fd029957a89fcca1d1a2096b28c844054982646a37
}
