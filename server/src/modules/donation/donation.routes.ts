import type { RequestHandler } from 'express'
import { Router } from 'express'
import { ensureUserIsAuthenticated } from '../auth/auth.middlewares'
import {
  createDonation,
  getDonationById,
  getDonations,
  getDonationsByCurrentUser,
  getDonationsByFundraiserId,
  getDonationsByUserId,
} from './donation.controllers'

// Sets up the donation router.
const donationRouter = Router()

// Defines the donation routes.
donationRouter.get('/', getDonations as RequestHandler)
donationRouter.get('/:id', getDonationById as RequestHandler)
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
