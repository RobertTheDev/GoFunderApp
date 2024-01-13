import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getAllUsers } from './user.controllers'

// Sets up the user router.
const userRouter = Router()

// Defines the user routes.
userRouter.get('/', getAllUsers as RequestHandler)

export default userRouter
