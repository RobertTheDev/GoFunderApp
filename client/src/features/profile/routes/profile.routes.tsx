import DeleteProfilePage from "../pages/DeleteProfile";
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
  {
    path: "profile/close-account",
    element: <DeleteProfilePage />,
  },
];

export default profileRouter;
