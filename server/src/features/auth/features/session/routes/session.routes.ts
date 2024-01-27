import { type RequestHandler, Router } from 'express'
import { getSessionsByCurrentUser } from '../handlers/getSessionsByCurrentUser.js'
import { deleteSessionBySessionId } from '../handlers/deleteSessionBySessionId.js'
import { ensureUserIsAuthenticated } from '../../../../../features/auth/middlewares/auth.middlewares.js'

const sessionRouter: Router = Router()

sessionRouter.delete(
  '/:sessionId',
  ensureUserIsAuthenticated as RequestHandler,
  deleteSessionBySessionId as RequestHandler,
)

sessionRouter.get(
  '/sessions',
  ensureUserIsAuthenticated as RequestHandler,
  getSessionsByCurrentUser as RequestHandler,
)

export default sessionRouter
