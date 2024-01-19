import CharitiesRoute from "../views/Charities";
import CharityRoute from "../views/Charity";
import CreateCharityRoute from "../views/CreateCharity";
import DeleteCharityRoute from "../views/DeleteCharity";
import UpdateCharityRoute from "../views/UpdateCharity";

const charityRouter = [
  {
    path: "/charities",
    element: <CharitiesRoute />,
  },
  {
    path: "/charities/:id",
    element: <CharityRoute />,
  },
  {
    path: "/charities/:id/delete",
    element: <DeleteCharityRoute />,
  },
  {
    path: "/charities/:id/update",
    element: <UpdateCharityRoute />,
  },
  {
    path: "/charities/create-charity",
    element: <CreateCharityRoute />,
  },
];

export default charityRouter;
