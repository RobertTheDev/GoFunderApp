import { ReactElement } from 'react';
import Seo from '../../../common/Seo';
import SendEmailVerificationForm from '../../components/SendEmailVerificationForm';
import SettingsPageLayout from '../../layouts/SettingsPageLayout';

export default function SendEmailVerificationPage(): ReactElement {
  return (
    <>
      <Seo
        title="Send Email Verification"
        description={`
        You can send an email verification request here on this page. 
        Press the confirmation button and we will send an email 
        with instructions to your account email address.
      `}
      />
      <SettingsPageLayout>
        <SendEmailVerificationForm />
      </SettingsPageLayout>
    </>
  );
}
