import { Router } from 'express'
import authRouter from '../features/auth/routes/auth.routes.js'
import donationRouter from '../features/donation/routes/donation.routes.js'
import fundraiserRouter from '../features/fundraiser/routes/fundraiser.routes.js'
import savedFundraiserRouter from '../features/savedFundraiser/routes/savedFundraiser.routes.js'
import uploadRouter from '../features/upload/routes/upload.routes.js'
import userRouter from '../features/user/routes/user.routes.js'
import fundraiserOwnerRouter from 'src/features/fundraiserOwner/routes/fundraiserOwner.routes.js'

// Sets up the apps routers with the modulised routers.
const appRouter: Router = Router()

// Defines app routes.
appRouter.use('/auth', authRouter)
appRouter.use('/donations', donationRouter)
appRouter.use('/fundraisers', fundraiserRouter)
appRouter.use('/fundraiser-owners', fundraiserOwnerRouter)
appRouter.use('/saved-fundraisers', savedFundraiserRouter)
appRouter.use('/uploads', uploadRouter)
appRouter.use('/users', userRouter)

export default appRouter
