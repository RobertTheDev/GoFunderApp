import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../features/layout/components/PageLayout";
import authRouter from "../features/auth/routes/auth.routes";
import charityRouter from "../features/charity/routes/charity.routes";
import infoRouter from "../features/info/routes/info.routes";
import fundraiserRouter from "../features/fundraiser/routes/fundraiser.routes";
import userRouter from "../features/user/routes/user.routes";
import savedFundraiserRouter from "../features/savedFundraiser/routes/savedFundraiser.routes";
import charityFollowerRouter from "../features/charityFollower/routes/charityFollower.routes";
import charityOwnerRouter from "../features/charityOwner/routes/charityOwner.routes";
import homeRouter from "../features/home/routes/home";
import notificationRouter from "../features/notification/routes/notification.routes";
import profileRouter from "../features/profile/routes/profile.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      ...authRouter,
      ...charityRouter,
      ...charityFollowerRouter,
      ...charityOwnerRouter,
      ...fundraiserRouter,
      ...homeRouter,
      ...infoRouter,
      ...notificationRouter,
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
