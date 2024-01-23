import ProfilePage from "../pages/Profile";
import SessionsPage from "../pages/Sessions";

const profileRouter = [
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/sessions",
    element: <SessionsPage />,
  },
];

export default profileRouter;
