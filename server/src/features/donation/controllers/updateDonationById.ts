import type { Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import winstonLogger from '../../../utils/winston/winstonLogger.js'
import { DonationService } from '../donation.service.js'
import { createDonationSchema } from '../donation.validators.js'

const donationService = new DonationService()

export async function updateDonationById(
  req: Request,
  res: Response,
): Promise<void> {
  const { body } = req

  try {
    const validation = await createDonationSchema.safeParseAsync(body)

    if (validation.success) {
      const donation = await donationService.createDonation(validation.data)

      res.status(StatusCodes.CREATED).json(donation)
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(validation.error)
    }
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}
