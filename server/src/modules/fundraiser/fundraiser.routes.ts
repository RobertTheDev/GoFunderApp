import type { RequestHandler } from 'express'
import { Router } from 'express'
import {
  getAllFundraisers,
  getFundraiserById,
} from './fundraiser.controllers.js'
import { getFundraisersByCategory } from './controllers/getFundraisersByCategory.js'

// Sets up the fundraiser router.
const fundraiserRouter = Router()

// Defines the fundraiser routes.
fundraiserRouter.get('/', getAllFundraisers as RequestHandler)
fundraiserRouter.get(
  '/category/:category',
  getFundraisersByCategory as RequestHandler,
)

fundraiserRouter.get('/:id', getFundraiserById as RequestHandler)

export default fundraiserRouter
