import { Router } from 'express'
import authRouter from '../features/auth/routes/auth.routes.js'
import charityRouter from '../features/charity/routes/charity.routes.js'
import charityFollowerRouter from '../features/charityFollower/routes/charityFollower.routes.js'
import charityOwnerRouter from '../features/charityOwner/routes/charityOwner.routes.js'
import donationRouter from '../features/donation/routes/donation.routes.js'
import emailRouter from '../features/email/routes/email.routes.js'
import fundraiserRouter from '../features/fundraiser/routes/fundraiser.routes.js'
import savedFundraiserRouter from '../features/savedFundraiser/routes/savedFundraiser.routes.js'
import uploadRouter from '../features/upload/routes/upload.routes.js'
import userRouter from '../features/user/routes/user.routes.js'

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
