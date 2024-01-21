import type { Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import winstonLogger from '../../../utils/winston/winstonLogger.js'
import { findDonations } from '../donation.service.js'

export async function getDonationsByCurrentUser(
  req: Request,
  res: Response,
): Promise<void> {
  const {
    session: { user },
  } = req

  try {
    const donations = await findDonations({
      where: {
        userId: user?.id,
      },
    })

    res.status(StatusCodes.OK).json(donations)
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}
