import { ReactElement } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import footerLinks from "./footerLinks";
import socialLinks from "./socialLinks";

export default function Footer(): ReactElement {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerLeft}>
        ©{new Date().getFullYear()} GoFunder
      </div>
      <div className={styles.footerCenter}>
        {footerLinks.map((footerLink) => {
          return (
            <Link
              className={styles.footerLink}
              key={footerLink.id}
              to={footerLink.url}
            >
              {footerLink.name}
            </Link>
          );
        })}
      </div>
      <div className={styles.footerRight}>
        {socialLinks.map((socialLink) => {
          return (
            <a
              href={socialLink.url}
              key={socialLink.id}
              target="_blank"
              rel="noreferrer"
            >
              {socialLink.icon}
            </a>
          );
        })}
      </div>
    </footer>
  );
}
