import IRouterRoute from '../../../interfaces/RouterRoute';
import OwnedFundraisersPage from '../pages/OwnedFundraisersPage';

const fundraiserOwnerRouter: IRouterRoute[] = [
  { path: '/owned-fundraisers', element: <OwnedFundraisersPage /> }
];

export default fundraiserOwnerRouter;
