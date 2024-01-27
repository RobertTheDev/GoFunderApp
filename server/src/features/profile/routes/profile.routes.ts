import { type RequestHandler, Router } from 'express'
import { ensureUserIsAuthenticated } from 'src/features/auth/middlewares/auth.middlewares'
import { deleteAuthenticatedUserHandler } from '../handlers/deleteAuthenticatedUser'
import { getAuthenticatedUserHandler } from '../handlers/getAuthenticatedUser'

const profileRouter: Router = Router()

// Defines the charity routes.
profileRouter.post(
  '/delete',
  ensureUserIsAuthenticated as RequestHandler,
  deleteAuthenticatedUserHandler as RequestHandler,
)
profileRouter.get(
  '/user',
  ensureUserIsAuthenticated as RequestHandler,
  getAuthenticatedUserHandler as RequestHandler,
)

export default profileRouter
