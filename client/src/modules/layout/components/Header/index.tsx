import { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { AuthContext } from "../../../auth/contexts/AuthContext/context";

export default function Header(): ReactElement {
  const { authModal, toggleAuthModal } = useContext(AuthContext);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <Link to={"/"} className={styles.headerLogo}>
          GoFunder
        </Link>

        <Link to={"/"}>Home</Link>
        <Link to={"/charities"}>Find Charities</Link>
        <Link to={"/fundraisers"}>Find Fundraisers</Link>
        {/* <Link to={"/profile"}>Profile</Link> */}
      </div>
      <div className={styles.headerRight}>
        <button type="button">Start Fundraising</button>

        <button
          type="button"
          onClick={() => toggleAuthModal(!authModal.active, "signIn")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
