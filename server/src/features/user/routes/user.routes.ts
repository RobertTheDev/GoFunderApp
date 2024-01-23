import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getUserByIdHandler } from '../handlers/getUserById'
import { getUserByUsernameHandler } from '../handlers/getUserByUsername'

// Sets up the user router.
const userRouter = Router()

// Defines the user routes.
userRouter.get('/id/:id', getUserByIdHandler as RequestHandler)

userRouter.get('/:username', getUserByUsernameHandler as RequestHandler)

export default userRouter
