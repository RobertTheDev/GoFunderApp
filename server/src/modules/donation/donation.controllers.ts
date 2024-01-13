import type { Request, Response } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import winstonLogger from '../../utils/winston/winstonLogger.js'
import { DonationService } from './donation.service.js'
import { createDonationSchema } from './donation.validators.js'

const donationService = new DonationService()

export async function createDonation(
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

export async function getDonationById(
  req: Request,
  res: Response,
): Promise<void> {
  const {
    params: { id },
  } = req

  try {
    const donations = await donationService.findDonations({
      where: {
        id,
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

export async function getDonations(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const donations = await donationService.findDonations({})

    res.status(StatusCodes.OK).json(donations)
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}

export async function getDonationsByFundraiserId(
  req: Request,
  res: Response,
): Promise<void> {
  const {
    params: { fundraiserId },
  } = req

  try {
    const donations = await donationService.findDonations({
      where: {
        fundraiserId,
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

export async function getDonationsByUserId(
  req: Request,
  res: Response,
): Promise<void> {
  const {
    params: { userId },
  } = req

  try {
    const donations = await donationService.findDonations({
      where: {
        userId,
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

export async function getDonationsByCurrentUser(
  req: Request,
  res: Response,
): Promise<void> {
  const {
    session: { user },
  } = req

  try {
    const donations = await donationService.findDonations({
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
