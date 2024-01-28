import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import prismaClient from '../../../utils/prisma/prismaClient.js'

// Gets all saved fundraisers by the current user from the prisma database.
export async function getOwnersByFundraiserIdHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  // Get user from session.
  const { params } = req
  const { fundraiserId } = params

  try {
    // If no cached saved fundraisers are found then query the database.
    const savedFundraisers = await prismaClient.fundraiserOwner.findMany({
      where: {
        fundraiserId,
      },
      include: {
        user: true,
      },
    })

    // Return a success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found fundraiser owners from the database.',
      data: savedFundraisers,
    })
  } catch (error) {
    next(error)
  }
}
