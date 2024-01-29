import { Router } from 'express'
import authRouter from '../features/auth/routes/auth.routes.js'
import donationRouter from '../features/donation/routes/donation.routes.js'
import fundraiserRouter from '../features/fundraiser/routes/fundraiser.routes.js'
import savedFundraiserRouter from '../features/savedFundraiser/routes/savedFundraiser.routes.js'
import fundraiserOwnerRouter from '../features/fundraiserOwner/routes/fundraiserOwner.routes.js'
import profileRouter from '../features/profile/routes/profile.routes.js'

// Sets up the apps routers with the modulised routers.
const router: Router = Router()

// Defines app routes.
router.use('/auth', authRouter)
router.use('/donation', donationRouter)
router.use('/fundraiser', fundraiserRouter)
router.use('/fundraiser-owner', fundraiserOwnerRouter)
router.use('/profile', profileRouter)
router.use('/saved-fundraiser', savedFundraiserRouter)

export default router
