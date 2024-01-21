import { Router } from 'express'
import authRouter from '../features/auth/auth.routes.js'
import charityRouter from '../features/charity/charity.routes.js'
import charityFollowerRouter from '../features/charityFollower/charityFollower.routes.js'
import charityOwnerRouter from '../features/charityOwner/charityOwner.routes.js'
import donationRouter from '../features/donation/donation.routes.js'
import emailRouter from '../features/email/email.routes.js'
import fundraiserRouter from '../features/fundraiser/fundraiser.routes.js'
import savedFundraiserRouter from '../features/savedFundraiser/savedFundraiser.routes.js'
import uploadRouter from '../features/upload/upload.routes.js'
import userRouter from '../features/user/user.routes.js'

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
