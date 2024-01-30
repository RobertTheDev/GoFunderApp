import { ReactElement } from 'react';
import Seo from '../../../common/Seo';
import { Link } from 'react-router-dom';
import settingsLinks from '../../../../utils/settingsLinks';

export default function SettingsPage(): ReactElement {
  return (
    <>
      <Seo
        title="Settings"
        description={`
        This page displays a menu with links to manage and 
        update your settings in order to manage the security 
        and privacy of your GoFunder account.
      `}
      />
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
