import { Router } from 'express'
import charityRouter from '../modules/charity/charity.routes.js'
import authRouter from '../modules/auth/auth.routes.js'
import emailRouter from '../modules/email/email.routes.js'
import uploadRouter from '../modules/upload/upload.routes.js'
import userRouter from 'src/modules/user/user.routes.js'

// Sets up the apps routers with the modulised routers.
const appRouter = Router()

// Defines app routes.
appRouter.use('/auth', authRouter)
appRouter.use('/charities', charityRouter)
appRouter.use('/email', emailRouter)
appRouter.use('/uploads', uploadRouter)
appRouter.use('/users', userRouter)

export default appRouter
