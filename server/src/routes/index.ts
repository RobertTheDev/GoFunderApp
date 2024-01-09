import { Router } from 'express'
import charityRouter from '../modules/charity/charity.routes.js'
import authRouter from 'src/modules/auth/auth.routes.js'

// Sets up the apps routers with the modulised routers.
const appRouter = Router()

// Defines app routes.
appRouter.use('/auth', authRouter)
appRouter.use('/charities', charityRouter)

export default appRouter
