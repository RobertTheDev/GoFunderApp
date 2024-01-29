import ResetPasswordPage from "../pages/ResetPasswordPage";

export const authRoutes = {
  resetPassword: "/reset-password",
};

const authRouter: {
  path: string;
  element: JSX.Element;
}[] = [
  {
    path: authRoutes.resetPassword,
    element: <ResetPasswordPage />,
  },
];

export default authRouter;
