import IRouterRoute from '../../../interfaces/RouterRoute'
import CloseFundraiserPage from '../pages/CloseFundraiserPage'
import FundraiserAdminPage from '../pages/FundraiserAdminPage'
import FundraiserDonationsPage from '../pages/FundraiserDonationsPage'
import UpdateFundraiserPage from '../pages/UpdateFundraiserPage'
import AuthorizedFundraiserOwnerRoute from './AuthorizedFundraiserOwnerRoute'

const fundraiserAdminRouter: IRouterRoute[] = [
  {
    path: '/fundraisers/:fundraiserId/admin/close-fundraiser',
    element: (
      <AuthorizedFundraiserOwnerRoute>
        <CloseFundraiserPage />
      </AuthorizedFundraiserOwnerRoute>
    ),
  },
  {
    path: '/fundraisers/:fundraiserId/admin',
    element: (
      <AuthorizedFundraiserOwnerRoute>
        <FundraiserAdminPage />
      </AuthorizedFundraiserOwnerRoute>
    ),
  },
  {
    path: '/fundraisers/:fundraiserId/admin/donations',
    element: (
      <AuthorizedFundraiserOwnerRoute>
        <FundraiserDonationsPage />
      </AuthorizedFundraiserOwnerRoute>
    ),
  },
  {
    path: '/fundraisers/:fundraiserId/admin/update',
    element: (
      <AuthorizedFundraiserOwnerRoute>
        <UpdateFundraiserPage />
      </AuthorizedFundraiserOwnerRoute>
    ),
  },
]

export default fundraiserAdminRouter
