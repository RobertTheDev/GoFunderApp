import IRouterRoute from '../../../interfaces/RouterRoute';
import SavedFundraisersPage from '../pages/SavedFundraisers';

const savedFundraiserRouter: IRouterRoute[] = [
  {
    path: '/saved-fundraisers',
    element: <SavedFundraisersPage />
  }
];

export default savedFundraiserRouter;
