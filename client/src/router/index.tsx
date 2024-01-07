import { createBrowserRouter } from "react-router-dom";
import Charities from "../modules/charity/routes/Charities";
import PageLayout from "../modules/layout/components/PageLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <Charities />,
      },
    ],
  },
]);

export default router;
