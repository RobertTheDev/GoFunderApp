import { ReactElement } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export default function Banner(): ReactElement {
  const navigation = useNavigate();

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContentContainer}>
        <h2 className={styles.bannerText}>
          Help and Support Local Charities with GoFunder.
        </h2>
        <p>Help and Support Local Charities with GoFunder.</p>
        <div>
          <button type="button" onClick={() => navigation("/fundraisers")}>
            Find Fundraisers
          </button>
          <button
            type="button"
            onClick={() => navigation("/start-fundraising")}
          >
            Start Fundraising
          </button>
        </div>
      </div>

      <div className={styles.bannerImageContainer}>
        <img
          className={styles.bannerImage}
          src={
            "https://images.unsplash.com/photo-1596460658047-1826d5921c56?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Runners completing their marathon."
        />
      </div>
    </div>
  );
}
