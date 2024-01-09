import type { RequestHandler } from 'express'
import { Router } from 'express'
import { signUp } from './auth.controllers'

// Sets up the charity router.
const authRouter = Router()

// Defines the charity routes.
authRouter.post('/sign-up', signUp as RequestHandler)

export default authRouter
