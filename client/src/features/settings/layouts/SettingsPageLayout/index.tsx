import { ReactElement, ReactNode } from 'react';
import SettingsMenu from '../../components/SettingsMenu';

export default function SettingsPageLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div>
      <div>
        <SettingsMenu />
      </div>
      <div>{children}</div>
    </div>
  );
}
