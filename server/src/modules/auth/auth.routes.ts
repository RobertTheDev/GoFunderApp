import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getAuthenticatedUser, signUp } from './auth.controllers'

// Sets up the charity router.
const authRouter = Router()

// Defines the charity routes.
authRouter.get('/user', getAuthenticatedUser as RequestHandler)
authRouter.post('/sign-up', signUp as RequestHandler)

export default authRouter
