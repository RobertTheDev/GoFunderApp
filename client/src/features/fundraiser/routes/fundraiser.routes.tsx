import CreateFundraiserPage from "../pages/CreateFundraiser";
import DeleteFundraiserPage from "../pages/DeleteFundraiser";
import FundraiserPage from "../pages/Fundraiser";
import FundraisersPage from "../pages/Fundraisers";
import UpdateFundraiserPage from "../pages/UpdateFundraiser";

const fundraiserRouter = [
  { path: "/fundraisers", element: <FundraisersPage /> },
  { path: "/fundraisers/:slug", element: <FundraiserPage /> },
  { path: "/fundraisers/:slug/delete", element: <DeleteFundraiserPage /> },
  { path: "/fundraisers/:slug/edit", element: <UpdateFundraiserPage /> },
  { path: "/start-fundraising", element: <CreateFundraiserPage /> },
];

export default fundraiserRouter;
