import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getAuthenticatedUser, signOut } from './auth.controllers.js'
import emailPasswordRouter from './emailPassword/emailPassword.routes.js'
import totpRouter from './totp/totp.routes.js'
import oauthRouter from './oauth/oauth.routes.js'

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