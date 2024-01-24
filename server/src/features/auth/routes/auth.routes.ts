import type { RequestHandler } from 'express'
import { Router } from 'express'
import emailPasswordRouter from '../features/emailPassword/routes/emailPassword.routes.js'
import totpRouter from '../features/totp/routes/totp.routes.js'
import sessionRouter from '../features/session/routes/session.routes.js'
import { getAuthenticatedUserHandler } from '../handlers/getAuthenticatedUser.js'
import { signOutHandler } from '../handlers/signOut.js'
import { ensureUserIsAuthenticated } from '../middlewares/auth.middlewares.js'
import { deleteAuthenticatedUserHandler } from '../handlers/deleteAuthenticatedUser.js'

// Sets up the charity router.
const authRouter: Router = Router()

// Defines the charity routes.
authRouter.post(
  '/delete',
  ensureUserIsAuthenticated as RequestHandler,
  deleteAuthenticatedUserHandler as RequestHandler,
)
authRouter.get(
  '/user',
  ensureUserIsAuthenticated as RequestHandler,
  getAuthenticatedUserHandler as RequestHandler,
)
authRouter.post(
  '/sign-out',
  ensureUserIsAuthenticated as RequestHandler,
  signOutHandler as RequestHandler,
)
// Configures auth module routers.
authRouter.use('/', emailPasswordRouter)
authRouter.use('/session', sessionRouter)
authRouter.use('/totp', totpRouter)

export default authRouter
