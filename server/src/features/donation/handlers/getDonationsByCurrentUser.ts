import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { findDonations } from '../services/donation.service.js'

export async function getDonationsByCurrentUserHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const {
    session: { user },
  } = req

  try {
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    const donations = await findDonations({
      where: {
        userId: user.id,
      },
    })

    // Return the created fundraiser and success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found donations by the current user.',
      data: donations,
    })
  } catch (error) {
    next(error)
  }
}
