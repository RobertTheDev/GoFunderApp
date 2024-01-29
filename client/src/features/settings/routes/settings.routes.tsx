import RouterRoute from "../../../interfaces/RouterRoute";
import ChangeEmailPage from "../pages/ChangeEmailPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import CloseAccountPage from "../pages/CloseAccountPage";
import SendEmailVerificationPage from "../pages/SendEmailVerificationPage";
import SessionsPage from "../pages/SessionsPage";
import SetUpTotpPage from "../pages/SetUpTotpPage";
import SettingsPage from "../pages/SettingsPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import settingsPaths from "./settingsPaths";

const settingsRouter: RouterRoute[] = [
  {
    path: settingsPaths.changeEmail,
    element: <ChangeEmailPage />,
  },
  {
    path: settingsPaths.changePassword,
    element: <ChangePasswordPage />,
  },
  {
    path: settingsPaths.closeAccount,
    element: <CloseAccountPage />,
  },
  {
    path: settingsPaths.sendEmailVerification,
    element: <SendEmailVerificationPage />,
  },
  {
    path: settingsPaths.sessions,
    element: <SessionsPage />,
  },
  {
    path: settingsPaths.settings,
    element: <SettingsPage />,
  },
  {
    path: settingsPaths.setupMfa,
    element: <SetUpTotpPage />,
  },
  {
    path: settingsPaths.verifyEmail,
    element: <VerifyEmailPage />,
  },
];

export default settingsRouter;
