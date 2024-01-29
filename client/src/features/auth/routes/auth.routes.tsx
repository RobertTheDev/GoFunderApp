import IRouterRoute from "../../../interfaces/RouterRoute";
import ResetPasswordPage from "../pages/ResetPasswordPage";

export const authRoutes = {
  resetPassword: "/reset-password",
};

const authRouter: IRouterRoute[] = [
  {
    path: authRoutes.resetPassword,
    element: <ResetPasswordPage />,
  },
];

export default authRouter;
