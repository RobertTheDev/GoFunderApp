import type { RequestHandler } from 'express'
import { Router } from 'express'
import {
  getAuthenticatedUser,
  signOut,
} from '../controllers/auth.controllers.js'
import emailPasswordRouter from '../features/emailPassword/routes/emailPassword.routes.js'
import totpRouter from '../features/totp/routes/totp.routes.js'
import oauthRouter from '../features/oauth/routes/oauth.routes.js'

// Sets up the charity router.
const authRouter: Router = Router()

// Defines the charity routes.
authRouter.get('/user', getAuthenticatedUser as RequestHandler)
authRouter.post('/sign-out', signOut as RequestHandler)
// Configures auth module routers.
authRouter.use('/', emailPasswordRouter)
authRouter.use('/oauth', oauthRouter)
authRouter.use('/totp', totpRouter)

export default authRouter
