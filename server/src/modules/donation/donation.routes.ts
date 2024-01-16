import type { RequestHandler } from 'express'
import { Router } from 'express'
import { ensureUserIsAuthenticated } from '../auth/auth.middlewares'
import { getDonationsByFundraiserId } from './controllers/getDonationsByFundraiserId'
import { getDonationsByUserId } from './controllers/getDonationsByUserId'
import { getDonationsByCurrentUser } from './controllers/getDonationsByCurrentUser'
import { createDonation } from './controllers/createDonation'

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
donationRouter.post('/create', createDonation as RequestHandler)

export default donationRouter
