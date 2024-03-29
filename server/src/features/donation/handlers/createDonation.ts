import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import createDonationSchema from '../validators/createDonation.schema.js'
import prismaClient from '../../../utils/prisma/prismaClient.js'

// This handler creates a fundraiser with a charity id.

export async function createDonationHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  const { body, params, session } = req
  const { user } = session
  const { fundraiserId } = params

  try {
    // If no user is in session return an error.
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    if (fundraiserId == null || fundraiserId === undefined) {
      throw new Error('No fundraiser ID was provided.')
    }

    // Validate the request body using the validation schema.
    const validation = await createDonationSchema.safeParseAsync(body)

    // If validation is unsuccessful return an error.
    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    const findFundraiser = await prismaClient.fundraiser.findUnique({
      where: {
        id: fundraiserId,
      },
    })

    if (findFundraiser == null) {
      throw new Error('No fundraiser found.')
    }

    // Create a fundraiser with validated data.
    const createdFundraiser = await prismaClient.donation.create({
      data: {
        ...validation.data,
        fundraiserId,
        userId: user.id,
      },
    })

    await prismaClient.fundraiser.update({
      where: {
        id: fundraiserId,
      },
      data: {
        totalDonations: { increment: 1 },
        totalRaised: { increment: validation.data.amount },
      },
    })

    // Return the created fundraiser and success message.
    res.status(StatusCodes.CREATED).json({
      success: true,
      status: ReasonPhrases.CREATED,
      message: 'Successfully created donation.',
      data: createdFundraiser,
    })
  } catch (error) {
    next(error)
  }
}
