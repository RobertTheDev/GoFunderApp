import { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { AuthContext } from "../../../auth/contexts/AuthContext/context";

export default function Header(): ReactElement {
  const { authModal, toggleAuthModal, user } = useContext(AuthContext);

  return (
    <div className={styles.headerContainer}>
      <button onClick={() => toggleAuthModal(!authModal.active, "signIn")}>
        Open
      </button>
      {user ? <p>{user.email}</p> : <p>No</p>}
      <Link to={"/"}>Home</Link>

      <Link to={"/charities"}>Charities</Link>
      <Link to={"/fundraisers"}>Fundraisers</Link>
      <Link to={"/profile"}>Profile</Link>
    </div>
  );
}
