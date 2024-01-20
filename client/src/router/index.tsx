import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../modules/layout/components/PageLayout";
import authRouter from "../modules/auth/routes/auth.routes";
import charityRouter from "../modules/charity/routes/charity.routes";
import HomePage from "../modules/home/pages/HomePage";
import infoRouter from "../modules/info/routes/info.routes";
import fundraiserRouter from "../modules/fundraiser/routes/fundraiser.routes";
import userRouter from "../modules/user/routes/user.routes";
import savedFundraiserRouter from "../modules/savedFundraiser/routes/savedFundraiser.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      ...authRouter,
      ...charityRouter,
      ...fundraiserRouter,
      ...infoRouter,
      ...savedFundraiserRouter,
      ...userRouter,
      {
        path: "/*",
        element: <p>Not found</p>,
      },
      { path: "/", element: <HomePage /> },
    ],
  },
]);

export default router;
