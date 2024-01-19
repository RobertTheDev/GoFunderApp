import PasswordSignUpForm from "../components/password/PasswordSignUpForm";
import AmazonCallback from "../routes/AmazonCallback";
import FacebookCallback from "../routes/FacebookCallback";
import GithubCallback from "../routes/GithubCallback";
import GoogleCallback from "../routes/GoogleCallback";

const authRouter = [
  {
    path: "/sign-up",
    element: <PasswordSignUpForm />,
  },
  {
    path: "/auth/amazon/callback",
    element: <AmazonCallback />,
  },

  {
    path: "/auth/facebook/callback",
    element: <FacebookCallback />,
  },
  {
    path: "/auth/github/callback",
    element: <GithubCallback />,
  },
  {
    path: "/auth/google/callback",
    element: <GoogleCallback />,
  },
];

export default authRouter;
