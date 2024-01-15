import { Router } from 'express'
import authRouter from '../modules/auth/auth.routes.js'
import charityRouter from '../modules/charity/charity.routes.js'
import charityFollowerRouter from '../modules/charityFollower/charityFollower.routes.js'
import charityOwnerRouter from '../modules/charityOwner/charityOwner.routes.js'
import donationRouter from '../modules/donation/donation.routes.js'
import emailRouter from '../modules/email/email.routes.js'
import fundraiserRouter from '../modules/fundraiser/fundraiser.routes.js'
import savedFundraiserRouter from '../modules/savedFundraiser/savedFundraiser.routes.js'
import uploadRouter from '../modules/upload/upload.routes.js'
import userRouter from '../modules/user/user.routes.js'

// Sets up the apps routers with the modulised routers.
const appRouter: Router = Router()

// Defines app routes.
appRouter.use('/auth', authRouter)
appRouter.use('/charities', charityRouter)
appRouter.use('/charity-followers', charityFollowerRouter)
appRouter.use('/charity-owners', charityOwnerRouter)
appRouter.use('/donations', donationRouter)
appRouter.use('/email', emailRouter)
appRouter.use('/fundraisers', fundraiserRouter)
appRouter.use('/saved-fundraisers', savedFundraiserRouter)
appRouter.use('/uploads', uploadRouter)
appRouter.use('/users', userRouter)

export default appRouter
