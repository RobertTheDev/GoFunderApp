import { ReactElement } from "react";
import styles from "./styles.module.scss";
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

const footerLinks = [
  { url: "/privacy-policy", name: "Privacy Policy" },
  { url: "/terms-and-conditions", name: "Terms and Conditions" },
  { url: "/about", name: "About" },
];

export default function Footer(): ReactElement {
  return (
    <footer className={styles.footerContainer}>
      <div>©{new Date().getFullYear()} GoFunder</div>
      <div>
        {footerLinks.map((footerLink) => {
          return (
            <a key={footerLink.url} href={footerLink.url}>
              {footerLink.name}
            </a>
          );
        })}
      </div>
      <div>
        <FaFacebook />
        <FaInstagram />
        <FaTiktok />
        <FaXTwitter />
      </div>
    </footer>
  );
}
