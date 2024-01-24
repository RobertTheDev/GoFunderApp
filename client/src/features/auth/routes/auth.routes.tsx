import AmazonCallbackPage from "../pages/AmazonCallback";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import FacebookCallbackPage from "../pages/FacebookCallback";
import GithubCallbackPage from "../pages/GithubCallback";
import GoogleCallbackPage from "../pages/GoogleCallback";

const authRouter = [
  {
    path: "/auth/amazon/callback",
    element: <AmazonCallbackPage />,
  },

  {
    path: "/auth/facebook/callback",
    element: <FacebookCallbackPage />,
  },
  {
    path: "/auth/github/callback",
    element: <GithubCallbackPage />,
  },
  {
    path: "/auth/google/callback",
    element: <GoogleCallbackPage />,
  },
  {
    path: "/change-password",
    element: <ChangePasswordPage />,
  },
];

export default authRouter;
