import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findFundraiserOwners } from '../services/fundraiserOwner.service.js'

// Gets all saved fundraisers by the current user from the prisma database.
export async function getFundraisersOwnedByUserHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  // Get user from session.
  const { session } = req
  const { user } = session

  try {
    // If no user is found return an error message.
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    // If no cached saved fundraisers are found then query the database.
    const savedFundraisers = await findFundraiserOwners({
      where: {
        userId: user.id,
      },
    })

    // Return a success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found saved fundraisers from the database.',
      data: savedFundraisers,
    })
  } catch (error) {
    next(error)
  }
}
