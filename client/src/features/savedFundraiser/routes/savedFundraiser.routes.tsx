import SavedFundraisersPage from "../pages/SavedFundraisers";

const savedFundraiserRouter: {
  path: string;
  element: JSX.Element;
}[] = [
  {
    path: "/saved-fundraisers",
    element: <SavedFundraisersPage />,
  },
];

export default savedFundraiserRouter;
