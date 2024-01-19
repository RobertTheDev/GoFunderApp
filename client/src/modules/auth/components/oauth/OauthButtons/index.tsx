import { ReactElement } from "react";
import oauthLinks from "./oauthLinks";
import styles from "./styles.module.scss";

export default function OauthButtons(): ReactElement {
  return (
    <div>
      {oauthLinks.map((oauthLink) => {
        return (
          <a
            href={oauthLink.url}
            key={oauthLink.name}
            className={styles.oauthContainer}
          >
            <p className={styles.oauthText}> {oauthLink.name}</p>
          </a>
        );
      })}
    </div>
  );
}
