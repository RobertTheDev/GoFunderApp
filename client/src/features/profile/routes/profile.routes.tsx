import IRouterRoute from "../../../interfaces/RouterRoute";
import AuthenticatedRoute from "../../auth/routes/protectedRoutes/AuthenticatedRoute";
import ChangeAvatarPage from "../pages/ChangeAvatarPage";
import EditProfilePage from "../pages/EditProfilePage";
import ProfilePage from "../pages/ProfilePage";

const profileRouter: IRouterRoute[] = [
  {
    path: "/change-avatar",
    element: (
      <AuthenticatedRoute>
        <ChangeAvatarPage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/edit-profile",
    element: (
      <AuthenticatedRoute>
        <EditProfilePage />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];

export default profileRouter;
