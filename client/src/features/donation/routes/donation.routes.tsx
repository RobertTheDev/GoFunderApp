import IRouterRoute from '../../../interfaces/RouterRoute';
import UserDonationsPage from '../pages/UserDonationsPage';

const donationRouter: IRouterRoute[] = [{ path: '/donations', element: <UserDonationsPage /> }];

export default donationRouter;
