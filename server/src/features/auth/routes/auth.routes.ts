import { Router } from 'express'
import emailPasswordRouter from '../features/emailPassword/routes/emailPassword.routes.js'
import totpRouter from '../features/totp/routes/totp.routes.js'
import sessionRouter from '../features/session/routes/session.routes.js'

// Sets up the charity router.s
const authRouter: Router = Router()
// Configures auth module routers.
authRouter.use('/password', emailPasswordRouter)
authRouter.use('/session', sessionRouter)
authRouter.use('/totp', totpRouter)

export default authRouter
