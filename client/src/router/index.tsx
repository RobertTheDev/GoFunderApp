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
import PasswordSignInForm from "../modules/auth/components/PasswordSignIn";
import PasswordSignUpForm from "../modules/auth/components/PasswordSignUp";
import SignInMenu from "../modules/auth/components/SignInMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <PasswordSignInForm />,
      },
      {
        path: "/*",
        element: <p>Not found</p>,
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
    ],
  },
]);

export default router;
