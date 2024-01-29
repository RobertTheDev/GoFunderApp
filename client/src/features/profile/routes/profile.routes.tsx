import IRouterRoute from "../../../interfaces/RouterRoute";
import ChangeAvatarPage from "../pages/ChangeAvatarPage";
import EditProfilePage from "../pages/EditProfilePage";
import ProfilePage from "../pages/ProfilePage";

const profileRouter: IRouterRoute[] = [
  {
    path: "/change-avatar",
    element: <ChangeAvatarPage />,
  },
  {
    path: "/edit-profile",
    element: <EditProfilePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];

export default profileRouter;
