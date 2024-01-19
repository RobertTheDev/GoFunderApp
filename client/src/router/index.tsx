import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../modules/layout/components/PageLayout";
import UsersRoute from "../modules/user/routes/Users";
import UserRoute from "../modules/user/routes/User";
import ProfileRoute from "../modules/auth/routes/Profile";
import authRouter from "../modules/auth/router";
import charityRouter from "../modules/charity/routes/charity.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      ...authRouter,
      ...charityRouter,
      {
        path: "/*",
        element: <p>Not found</p>,
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
