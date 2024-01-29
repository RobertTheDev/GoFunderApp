import { ReactElement } from "react";
import styles from "./styles.module.scss";
import tabBarLinks from "./tabBarLinks";

export default function TabBar(): ReactElement {
  return (
    <div className={styles.tabBarContainer}>
      {tabBarLinks.map((tabBarLink) => {
        return (
          <button key={tabBarLink.name} className={styles.tabBarButton}>
            {tabBarLink.icon}
            <p>{tabBarLink.name}</p>
          </button>
        );
      })}
    </div>
  );
}
