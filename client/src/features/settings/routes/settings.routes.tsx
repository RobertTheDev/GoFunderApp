import RouterRoute from '../../../interfaces/RouterRoute';
import ChangeEmailPage from '../pages/ChangeEmailPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import CloseAccountPage from '../pages/CloseAccountPage';
import SendEmailVerificationPage from '../pages/SendEmailVerificationPage';
import SessionsPage from '../pages/SessionsPage';
import SetUpTotpPage from '../pages/SetUpTotpPage';
import SettingsPage from '../pages/SettingsPage';
import VerifyEmailPage from '../pages/VerifyEmailPage';

const settingsRouter: RouterRoute[] = [
  {
    path: '/settings',
    element: <SettingsPage />
  },
  {
    path: '/settings/change-email',
    element: <ChangeEmailPage />
  },
  {
    path: '/settings/change-password',
    element: <ChangePasswordPage />
  },
  {
    path: 'settings/close-account',
    element: <CloseAccountPage />
  },
  {
    path: '/settings/send-email-verification',
    element: <SendEmailVerificationPage />
  },
  {
    path: '/settings/sessions',
    element: <SessionsPage />
  },
  {
    path: '/settings/setup-mfa',
    element: <SetUpTotpPage />
  },
  {
    path: '/settings/verify-email',
    element: <VerifyEmailPage />
  }
];

export default settingsRouter;
