import type { RequestHandler } from 'express'
import { Router } from 'express'
import { ensureUserIsAuthenticated } from '../../auth/middlewares/auth.middlewares.js'
import { getDonationsByFundraiserId } from '../controllers/getDonationsByFundraiserId.js'
import { getDonationsByUserId } from '../controllers/getDonationsByUserId.js'
import { getDonationsByCurrentUser } from '../controllers/getDonationsByCurrentUser.js'
import { createDonationHandler } from '../controllers/createDonation.js'

// Sets up the donation router.
const donationRouter = Router()

// Defines the donation routes.
donationRouter.get(
  '/fundraiser/:id',
  getDonationsByFundraiserId as RequestHandler,
)
donationRouter.get('/user/:id', getDonationsByUserId as RequestHandler)
donationRouter.get(
  '/current-user',
  ensureUserIsAuthenticated as RequestHandler,
  getDonationsByCurrentUser as RequestHandler,
)
donationRouter.post('/create', createDonationHandler as RequestHandler)

export default donationRouter
