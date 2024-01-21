import type { RequestHandler } from 'express'
import { Router } from 'express'
import { createCharityHandler } from './controllers/createCharity.js'
import { deleteCharityById } from './controllers/deleteCharityById.js'
import { getCharities } from './controllers/getCharities.js'
import { getCharityBySlug } from './controllers/getCharityBySlug.js'
import { updateCharityById } from './controllers/updateCharityById.js'

// Sets up the charity router.
const charityRouter: Router = Router()

// Defines the charity routes.
charityRouter.delete('/:id', deleteCharityById as RequestHandler)
charityRouter.get('/', getCharities as RequestHandler)
charityRouter.get('/:slug', getCharityBySlug as RequestHandler)
charityRouter.post('/create', createCharityHandler as RequestHandler)
charityRouter.put('/:id', updateCharityById as RequestHandler)

export default charityRouter
