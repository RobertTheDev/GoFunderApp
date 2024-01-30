import { ReactElement } from 'react';
import Seo from '../../../common/Seo';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import SettingsPageLayout from '../../layouts/SettingsPageLayout';

export default function ChangePasswordPage(): ReactElement {
  return (
    <>
      <Seo
        title="Change Password"
        description={`
        You can change your password here on this page. 
        Enter your current password and new password 
        in order to update your password.
        `}
      />
      <SettingsPageLayout>
        <ChangePasswordForm />
      </SettingsPageLayout>
    </>
  );
}
