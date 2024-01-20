import { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { AuthContext } from "../../../auth/contexts/AuthContext/context";
import { FaRegBell, FaRegHeart, FaRegMoon, FaRegSun } from "react-icons/fa6";
import ProfileMenu from "../ProfileMenu";

export default function Header(): ReactElement {
  const { authModal, toggleAuthModal, user } = useContext(AuthContext);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <Link to={"/"} className={styles.headerLogo}>
          GoFunder
        </Link>

        <Link to={"/"}>Home</Link>
        <Link to={"/charities"}>Find Charities</Link>
        <Link to={"/fundraisers"}>Find Fundraisers</Link>
        <Link to={"/start-fundraising"}>Start Fundraising</Link>
      </div>
      <div className={styles.headerRight}>
        {user ? (
          <div>
            <FaRegBell />
            <FaRegHeart />
            <FaRegSun />
            <FaRegMoon />
            <Link to={"/profile"}>
              <div className={styles.headerAvatarContainer}>
                {user.image ? (
                  <img
                    className={styles.headerAvatarImage}
                    src={user.image}
                    alt="Avatar"
                  />
                ) : (
                  <img
                    className={styles.headerAvatarImage}
                    src="https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
                    alt="Avatar"
                  />
                )}
              </div>
            </Link>
            <ProfileMenu />
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => toggleAuthModal(!authModal.active, "signIn")}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
