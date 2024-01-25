import { ReactElement } from "react";
import Seo from "../../../common/Seo";
import { Link } from "react-router-dom";
import settingsLinks from "../../../../utils/settingsLinks";

export default function SettingsPage(): ReactElement {
  return (
    <>
      <Seo title="Settings" description="" />
      <div>
        <h1>Settings</h1>
        {settingsLinks.map((settingsLink) => {
          return (
            <Link to={settingsLink.path} key={settingsLink.path}>
              <div>
                <p>{settingsLink.name}</p>
                <p>{settingsLink.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
