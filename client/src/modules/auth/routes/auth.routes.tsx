import AmazonCallbackPage from "../pages/AmazonCallback";
import FacebookCallbackPage from "../pages/FacebookCallback";
import GithubCallbackPage from "../pages/GithubCallback";
import GoogleCallbackPage from "../pages/GoogleCallback";
import ProfilePage from "../pages/Profile";

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
    path: "/profile",
    element: <ProfilePage />,
  },
];

export default authRouter;
