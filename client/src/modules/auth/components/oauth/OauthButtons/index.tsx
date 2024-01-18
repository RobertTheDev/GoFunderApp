import { ReactElement } from "react";
import oauthLinks from "./oauthLinks";

export default function OauthButtons(): ReactElement {
  return (
    <div>
      {oauthLinks.map((oauthLink) => {
        return (
          <a href={oauthLink.url} key={oauthLink.name}>
            {oauthLink.name}
          </a>
        );
      })}
    </div>
  );
}
