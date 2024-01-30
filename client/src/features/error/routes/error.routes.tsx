import IRouterRoute from '../../../interfaces/RouterRoute';
import NotFoundPage from '../pages/NotFoundPage';
import UnauthenticatedPage from '../pages/UnauthenticatedPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';

const errorRouter: IRouterRoute[] = [
  {
    path: '/*',
    element: <NotFoundPage />
  },
  {
    path: '/unauthenticated',
    element: <UnauthenticatedPage />
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />
  }
];

export default errorRouter;
