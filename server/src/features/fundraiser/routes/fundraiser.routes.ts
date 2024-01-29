import type { RequestHandler } from 'express'
import { Router } from 'express'
import { deleteFundraiserBySlugHandler } from '../handlers/deleteFundraiserBySlug.js'
import { getFundraisersHandler } from '../handlers/getFundraisers.js'
import { getFundraiserBySlugHandler } from '../handlers/getFundraiserBySlug.js'
import { getFundraiserByIdHandler } from '../handlers/getFundraiserById.js'
import { createFundraiserHandler } from '../handlers/createFundraiser.js'
import { updateCharityFundraiserBySlugHandler } from '../handlers/updateFundraiserBySlug.js'
import { getFundraisersByCategoryHandler } from '../handlers/getFundraisersByCategory.js'

// Sets up the fundraiser router.
const fundraiserRouter: Router = Router()

// Defines the fundraiser routes.
fundraiserRouter.delete(
  '/:slug',
  deleteFundraiserBySlugHandler as RequestHandler,
)

fundraiserRouter.get('/', getFundraisersHandler as RequestHandler)

fundraiserRouter.get(
  '/category/:category',
  getFundraisersByCategoryHandler as RequestHandler,
)

fundraiserRouter.get('/id/:id', getFundraiserByIdHandler as RequestHandler)

fundraiserRouter.get('/:slug', getFundraiserBySlugHandler as RequestHandler)

fundraiserRouter.post('/create', createFundraiserHandler as RequestHandler)

fundraiserRouter.put(
  '/:slug',
  updateCharityFundraiserBySlugHandler as RequestHandler,
)

export default fundraiserRouter
