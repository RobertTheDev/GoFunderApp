import DeleteProfilePage from "../pages/DeleteProfilePage";
import SessionsPage from "../pages/SessionsPage";

const settingsRouter = [
  {
    path: "/settings/sessions",
    element: <SessionsPage />,
  },
  {
    path: "settings/close-account",
    element: <DeleteProfilePage />,
  },
];

export default settingsRouter;
