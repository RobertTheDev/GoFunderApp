import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getAllUsers } from '../controllers/getAllUsers'
import { getUserById } from '../controllers/getUserById'

// Sets up the user router.
const userRouter = Router()

// Defines the user routes.
userRouter.get('/', getAllUsers as RequestHandler)
userRouter.get('/:id', getUserById as RequestHandler)

export default userRouter
