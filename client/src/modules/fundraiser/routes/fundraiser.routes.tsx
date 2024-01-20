import CreateFundraiser from "./CreateFundraiser";
import Fundraiser from "./Fundraiser";
import FundraisersRoute from "./Fundraisers";

const fundraiserRouter = [
  { path: "/fundraisers", element: <FundraisersRoute /> },
  { path: "/fundraisers/:id", element: <Fundraiser /> },
  { path: "/start-fundraising", element: <CreateFundraiser /> },
];

export default fundraiserRouter;
