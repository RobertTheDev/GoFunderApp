import {
  createCharity,
  deleteCharityById,
  getCharities,
  getCharityById,
  updateCharityById,
} from './charity.controllers.js'
import type { RequestHandler } from 'express'
import { Router } from 'express'

// Sets up the charity router.
const charityRouter = Router()

// Defines the charity routes.
charityRouter.delete('/:id/delete', deleteCharityById as RequestHandler)
charityRouter.get('/', getCharities as RequestHandler)
charityRouter.get('/:id', getCharityById as RequestHandler)
charityRouter.post('/create', createCharity as RequestHandler)
charityRouter.put('/:id/update', updateCharityById as RequestHandler)

export default charityRouter
