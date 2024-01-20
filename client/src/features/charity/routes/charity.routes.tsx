import CharitiesPage from "../pages/Charities";
import CharityPage from "../pages/Charity";
import CreateCharityPage from "../pages/CreateCharity";
import DeleteCharityPage from "../pages/DeleteCharity";
import UpdateCharityPage from "../pages/UpdateCharity";

const charityRouter = [
  {
    path: "/charities",
    element: <CharitiesPage />,
  },
  {
    path: "/charities/:id",
    element: <CharityPage />,
  },
  {
    path: "/charities/:id/delete",
    element: <DeleteCharityPage />,
  },
  {
    path: "/charities/:id/update",
    element: <UpdateCharityPage />,
  },
  {
    path: "/charities/create-charity",
    element: <CreateCharityPage />,
  },
];

export default charityRouter;
