import CreateFundraiserPage from "../pages/CreateFundraiser";
import FundraiserPage from "../pages/Fundraiser";
import FundraisersPage from "../pages/Fundraisers";

const fundraiserRouter = [
  { path: "/fundraisers", element: <FundraisersPage /> },
  { path: "/fundraisers/:id", element: <FundraiserPage /> },
  { path: "/start-fundraising", element: <CreateFundraiserPage /> },
];

export default fundraiserRouter;
