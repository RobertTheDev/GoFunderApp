import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../modules/layout/components/PageLayout";
import ProfileRoute from "../modules/auth/routes/Profile";
import authRouter from "../modules/auth/router";
import charityRouter from "../modules/charity/routes/charity.routes";
import HomePage from "../modules/home/pages/HomePage";
import infoRouter from "../modules/info/routes/info.routes";
import fundraiserRouter from "../modules/fundraiser/routes/fundraiser.routes";
import userRouter from "../modules/user/routes/user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      ...authRouter,
      ...charityRouter,
      ...fundraiserRouter,
      ...infoRouter,
      ...userRouter,
      {
        path: "/*",
        element: <p>Not found</p>,
      },
      { path: "/", element: <HomePage /> },

      {
        path: "/profile",
        element: <ProfileRoute />,
      },
    ],
  },
]);

export default router;
