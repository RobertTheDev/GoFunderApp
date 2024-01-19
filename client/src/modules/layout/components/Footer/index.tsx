import { ReactElement } from "react";
import styles from "./styles.module.scss";

export default function Footer(): ReactElement {
  return (
    <footer className={styles.footerContainer}>
      <p>Footer</p>
    </footer>
  );
}
