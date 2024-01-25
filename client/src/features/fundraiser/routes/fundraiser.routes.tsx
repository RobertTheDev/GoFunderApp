import CreateFundraiserPage from "../pages/CreateFundraiserPage";
import DeleteFundraiserPage from "../pages/DeleteFundraiserPage";
import FundraiserPage from "../pages/FundraiserPage";
import FundraisersPage from "../pages/FundraisersPage";
import UpdateFundraiserPage from "../pages/UpdateFundraiserPage";

const fundraiserRouter: {
  path: string;
  element: JSX.Element;
}[] = [
  { path: "/fundraisers", element: <FundraisersPage /> },
  { path: "/fundraisers/:slug", element: <FundraiserPage /> },
  { path: "/fundraisers/:slug/delete", element: <DeleteFundraiserPage /> },
  { path: "/fundraisers/:slug/edit", element: <UpdateFundraiserPage /> },
  { path: "/start-fundraising", element: <CreateFundraiserPage /> },
];

export default fundraiserRouter;
