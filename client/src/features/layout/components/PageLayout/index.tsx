import { ReactElement, useContext } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import AuthModal from "../../../auth/components/modal";
import { AuthContext } from "../../../auth/contexts/AuthContext/context";

export default function PageLayout(): ReactElement {
  const { authModal } = useContext(AuthContext);

  return (
    <div className={styles.pageLayoutContainer}>
      <Header />
      <main className={styles.pageMainContainer}>
        {authModal.active && <AuthModal />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
