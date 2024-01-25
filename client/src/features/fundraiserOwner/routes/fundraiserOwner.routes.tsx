import OwnedFundraisersPage from "../pages/OwnedFundraisersPage";

const fundraiserOwnerRouter: {
  path: string;
  element: JSX.Element;
}[] = [{ path: "/owned-fundraisers", element: <OwnedFundraisersPage /> }];

export default fundraiserOwnerRouter;
