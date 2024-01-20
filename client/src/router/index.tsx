import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../features/layout/components/PageLayout";
import authRouter from "../features/auth/routes/auth.routes";
import charityRouter from "../features/charity/routes/charity.routes";
import HomePage from "../features/home/pages/HomePage";
import infoRouter from "../features/info/routes/info.routes";
import fundraiserRouter from "../features/fundraiser/routes/fundraiser.routes";
import userRouter from "../features/user/routes/user.routes";
import savedFundraiserRouter from "../features/savedFundraiser/routes/savedFundraiser.routes";

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
