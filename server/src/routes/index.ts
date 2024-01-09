import { Router } from 'express'
import charityRouter from '../modules/charity/charity.routes.js'
import authRouter from '../modules/auth/auth.routes.js'
import emailRouter from '../modules/email/email.routes.js'

// Sets up the apps routers with the modulised routers.
const appRouter = Router()

// Defines app routes.
appRouter.use('/auth', authRouter)
appRouter.use('/charities', charityRouter)
appRouter.use('/email', emailRouter)

export default appRouter
