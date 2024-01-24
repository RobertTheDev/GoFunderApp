import type { RequestHandler } from 'express'
import { Router } from 'express'
import { deleteFundraiserBySlugHandler } from '../handlers/deleteFundraiserBySlug'
import { getFundraisersHandler } from '../handlers/getFundraisers'
import { getFundraiserBySlugHandler } from '../handlers/getFundraiserBySlug'
import { getFundraiserByIdHandler } from '../handlers/getFundraiserById'
import { createFundraiserHandler } from '../handlers/createFundraiser'
import { updateCharityFundraiserBySlugHandler } from '../handlers/updateFundraiserBySlug'
import { getFundraisersByCategoryHandler } from '../handlers/getFundraisersByCategory'

// Sets up the fundraiser router.
const fundraiserRouter = Router()

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

fundraiserRouter.get('/:slug', getFundraiserBySlugHandler as RequestHandler)

fundraiserRouter.get('/id/:id', getFundraiserByIdHandler as RequestHandler)

fundraiserRouter.post('/create', createFundraiserHandler as RequestHandler)

fundraiserRouter.put(
  '/:slug',
  updateCharityFundraiserBySlugHandler as RequestHandler,
)

export default fundraiserRouter
