import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../modules/layout/components/PageLayout";
import CharitiesRoute from "../modules/charity/routes/Charities";
import CharityRoute from "../modules/charity/routes/Charity";
import CreateCharityRoute from "../modules/charity/routes/CreateCharity";
import UpdateCharityRoute from "../modules/charity/routes/UpdateCharity";
import DeleteCharityRoute from "../modules/charity/routes/DeleteCharity";
import UsersRoute from "../modules/user/routes/Users";
import UserRoute from "../modules/user/routes/User";
import ProfileRoute from "../modules/auth/routes/Profile";
import GithubCallback from "../modules/auth/routes/GithubCallback";
import GoogleCallback from "../modules/auth/routes/GoogleCallback";
import AmazonCallback from "../modules/auth/routes/AmazonCallback";
import FacebookCallback from "../modules/auth/routes/FacebookCallback";
import PasswordSignUpForm from "../modules/auth/components/password/PasswordSignUpForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/*",
        element: <p>Not found</p>,
      },
      {
        path: "/sign-up",
        element: <PasswordSignUpForm />,
      },
      {
        path: "/charities",
        element: <CharitiesRoute />,
      },
      {
        path: "/charities/:id",
        element: <CharityRoute />,
      },
      {
        path: "/charities/:id/delete",
        element: <DeleteCharityRoute />,
      },
      {
        path: "/charities/:id/update",
        element: <UpdateCharityRoute />,
      },
      {
        path: "/charities/create-charity",
        element: <CreateCharityRoute />,
      },
      {
        path: "/users",
        element: <UsersRoute />,
      },
      {
        path: "/users/:id",
        element: <UserRoute />,
      },
      {
        path: "/profile",
        element: <ProfileRoute />,
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
    ],
  },
]);

export default router;
