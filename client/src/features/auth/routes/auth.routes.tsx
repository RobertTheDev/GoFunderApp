import ChangePasswordPage from "../pages/ChangePasswordPage";

const authRouter: {
  path: string;
  element: JSX.Element;
}[] = [
  {
    path: "/change-password",
    element: <ChangePasswordPage />,
  },
];

export default authRouter;
