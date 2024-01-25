import ResetPasswordPage from "../pages/ResetPasswordPage";

const authRouter: {
  path: string;
  element: JSX.Element;
}[] = [
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
];

export default authRouter;
