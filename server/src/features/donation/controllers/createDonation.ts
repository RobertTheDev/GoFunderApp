import type { Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import winstonLogger from '../../../utils/winston/winstonLogger.js'
import { createDonationSchema } from '../validators/createDonation.schema.js'
import { createDonation } from '../donation.service.js'

export async function createDonationHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { body } = req

  try {
    const validation = await createDonationSchema.safeParseAsync(body)

    if (validation.success) {
      const donation = await createDonation(validation.data)

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
