import UserDonationsPage from "../pages/UserDonationsPage";

const donationRouter: {
  path: string;
  element: JSX.Element;
}[] = [{ path: "/donations", element: <UserDonationsPage /> }];

export default donationRouter;
