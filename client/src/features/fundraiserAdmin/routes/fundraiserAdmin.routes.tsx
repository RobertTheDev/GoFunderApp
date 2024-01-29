import IRouterRoute from "../../../interfaces/RouterRoute";
import CloseFundraiserPage from "../pages/CloseFundraiserPage";
import FundraiserAdminPage from "../pages/FundraiserAdminPage";
import FundraiserDonationsPage from "../pages/FundraiserDonationsPage";
import UpdateFundraiserPage from "../pages/UpdateFundraiserPage";

const fundraiserAdminRouter: IRouterRoute[] = [
  {
    path: "/fundraisers/:fundraiserId/admin/close-fundraiser",
    element: <CloseFundraiserPage />,
  },
  {
    path: "/fundraisers/:fundraiserId/admin",
    element: <FundraiserAdminPage />,
  },
  {
    path: "/fundraisers/:fundraiserId/admin/donations",
    element: <FundraiserDonationsPage />,
  },
  {
    path: "/fundraisers/:fundraiserId/admin/update",
    element: <UpdateFundraiserPage />,
  },
];

export default fundraiserAdminRouter;
