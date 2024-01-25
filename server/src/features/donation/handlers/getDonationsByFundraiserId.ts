import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { findDonationsByFundraiser } from '../services/donation.service.js'

export async function getDonationsByFundraiserIdHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const {
    params: { fundraiserId },
  } = req

  try {
    if (fundraiserId == null || fundraiserId === undefined) {
      throw new Error('No fundraiser ID was provided.')
    }

    const donations = await findDonationsByFundraiser(fundraiserId)

    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found donations by fundraiser ID.',
      data: donations,
    })
  } catch (error) {
    next(error)
  }
}
