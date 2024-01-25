import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { findDonationsByUser } from '../services/donation.service.js'

export async function getDonationsByUserIdHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const {
    params: { userId },
  } = req

  try {
    if (userId == null || userId === undefined) {
      throw new Error('No user ID was provided.')
    }

    const donations = await findDonationsByUser(userId)

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found donations by user ID.',
      data: donations,
    })
  } catch (error) {
    next(error)
  }
}
