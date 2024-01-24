import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../features/layout/components/PageLayout";
import authRouter from "../features/auth/routes/auth.routes";
import infoRouter from "../features/info/routes/info.routes";
import fundraiserRouter from "../features/fundraiser/routes/fundraiser.routes";
import userRouter from "../features/user/routes/user.routes";
import savedFundraiserRouter from "../features/savedFundraiser/routes/savedFundraiser.routes";
import homeRouter from "../features/home/routes/home";
import profileRouter from "../features/profile/routes/profile.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      ...authRouter,
      ...fundraiserRouter,
      ...homeRouter,
      ...infoRouter,
      ...profileRouter,
      ...savedFundraiserRouter,
      ...userRouter,
      {
        path: "/*",
        element: <p>Not found</p>,
      },
    ],
  },
]);

export default router;
