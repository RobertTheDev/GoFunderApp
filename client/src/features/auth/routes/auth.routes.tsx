import IRouterRoute from '../../../interfaces/RouterRoute';
import ResetPasswordPage from '../pages/ResetPasswordPage';

const authRouter: IRouterRoute[] = [
  {
    path: '/reset-password',
    element: <ResetPasswordPage />
  }
];

export default authRouter;
