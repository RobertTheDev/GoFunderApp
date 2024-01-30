import IRouterRoute from '../../../interfaces/RouterRoute'
import CreateFundraiserPage from '../pages/CreateFundraiserPage'
import FundraiserPage from '../pages/FundraiserPage'
import FundraisersPage from '../pages/FundraisersPage'

const fundraiserRouter: IRouterRoute[] = [
  { path: '/fundraisers', element: <FundraisersPage /> },
  { path: '/fundraisers/:slug', element: <FundraiserPage /> },
  { path: '/start-fundraising', element: <CreateFundraiserPage /> },
]

export default fundraiserRouter
