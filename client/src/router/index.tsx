import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../modules/layout/components/PageLayout";
import CharitiesRoute from "../modules/charity/routes/Charities";
import CharityRoute from "../modules/charity/routes/Charity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <CharitiesRoute />,
      },
      {
        path: "/charities/:id",
        element: <CharityRoute />,
      },
    ],
  },
]);

export default router;
