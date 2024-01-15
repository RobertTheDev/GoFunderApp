import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getAuthenticatedUser, signOut } from './auth.controllers'
import emailPasswordRouter from './emailPassword/emailPassword.routes'
import magicLinkRouter from './magicLink/magicLink.routes'
import totpRouter from './totp/totp.routes'
import otpRouter from './otp/otp.routes'
import oauthRouter from './oauth/oauth.routes'

// Sets up the charity router.
const authRouter: Router = Router()

// Defines the charity routes.
authRouter.get('/user', getAuthenticatedUser as RequestHandler)
authRouter.post('/sign-out', signOut as RequestHandler)

authRouter.use('/', emailPasswordRouter)
authRouter.use('/magic-link', magicLinkRouter)
authRouter.use('/oauth', oauthRouter)
authRouter.use('/otp', otpRouter)
authRouter.use('/totp', totpRouter)

export default authRouter
