import CloseFundraiserPage from "../pages/CloseFundraiserPage";
import FundraiserAdminPage from "../pages/FundraiserAdminPage";
import FundraiserDonationsPage from "../pages/FundraiserDonationsPage";
import UpdateFundraiserPage from "../pages/UpdateFundraiserPage";

const fundraiserAdminRouter: {
  path: string;
  element: JSX.Element;
}[] = [
  {
    path: "/fundraisers/:fundraiserId/close-fundraiser",
    element: <CloseFundraiserPage />,
  },
  {
    path: "/fundraisers/:fundraiserId/fundraiser-admin",
    element: <FundraiserAdminPage />,
  },
  {
    path: "/fundraisers/:fundraiserId/donations",
    element: <FundraiserDonationsPage />,
  },
  {
    path: "/fundraisers/:fundraiserId/update",
    element: <UpdateFundraiserPage />,
  },
];

export default fundraiserAdminRouter;
