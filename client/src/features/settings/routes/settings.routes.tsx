import CloseAccountPage from "../pages/CloseAccountPage";
import SessionsPage from "../pages/SessionsPage";

const settingsRouter = [
  {
    path: "/settings/sessions",
    element: <SessionsPage />,
  },
  {
    path: "settings/close-account",
    element: <CloseAccountPage />,
  },
];

export default settingsRouter;
