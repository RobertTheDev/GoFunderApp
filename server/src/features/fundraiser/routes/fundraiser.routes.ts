import type { RequestHandler } from 'express'
import { Router } from 'express'
import { getFundraisersByCategory } from '../controllers/getFundraisersByCategory.js'
import { getFundraisers } from '../controllers/getFundraisers.js'
import { getFundraiserById } from '../controllers/getFundraiserById.js'

// Sets up the fundraiser router.
const fundraiserRouter = Router()

// Defines the fundraiser routes.
fundraiserRouter.get('/', getFundraisers as RequestHandler)
fundraiserRouter.get(
  '/category/:category',
  getFundraisersByCategory as RequestHandler,
)

fundraiserRouter.get('/:id', getFundraiserById as RequestHandler)

export default fundraiserRouter
