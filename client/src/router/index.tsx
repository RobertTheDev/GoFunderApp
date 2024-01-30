import { createBrowserRouter } from 'react-router-dom'
import PageLayout from '../features/layout/components/PageLayout'
import authRouter from '../features/auth/routes/auth.routes'
import infoRouter from '../features/info/routes/info.routes'
import fundraiserRouter from '../features/fundraiser/routes/fundraiser.routes'
import savedFundraiserRouter from '../features/savedFundraiser/routes/savedFundraiser.routes'
import homeRouter from '../features/home/routes/home'
import profileRouter from '../features/profile/routes/profile.routes'
import fundraiserOwnerRouter from '../features/fundraiserOwner/routes/fundraiserOwner.routes'
import donationRouter from '../features/donation/routes/donation.routes'
import errorRouter from '../features/error/routes/error.routes'
import settingsRouter from '../features/settings/routes/settings.routes'
import fundraiserAdminRouter from '../features/fundraiserAdmin/routes/fundraiserAdmin.routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      ...authRouter,
      ...donationRouter,
      ...errorRouter,
      ...fundraiserRouter,
      ...fundraiserAdminRouter,
      ...fundraiserOwnerRouter,
      ...homeRouter,
      ...infoRouter,
      ...profileRouter,
      ...savedFundraiserRouter,
      ...settingsRouter,
    ],
  },
])

export default router
