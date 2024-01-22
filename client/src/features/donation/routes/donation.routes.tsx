import CharityDonationsPage from "../pages/CharityDonationsPage";
import UserDonationsPage from "../pages/UserDonationsPage";

const donationRouter = [
  { path: "/:charityId/donations", element: <CharityDonationsPage /> },
  { path: "/donations", element: <UserDonationsPage /> },
];

export default donationRouter;
