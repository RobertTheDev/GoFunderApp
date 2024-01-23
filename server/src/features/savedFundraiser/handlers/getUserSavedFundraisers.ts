import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findSavedFundraisers } from '../services/savedFundraiser.service.js'
import {
  getCachedFundraisersSavedByUserId,
  setCachedFundraisersSavedByUserId,
} from '../services/savedFundraiserCache.service.js'

// Gets all saved fundraisers by the current user from the prisma database.
export async function getUserSavedFundraisersHandler(
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

    // Get and return the saved fundraisers from the cache.
    const cachedSavedFundraisers = await getCachedFundraisersSavedByUserId(
      user.id,
    )

    if (cachedSavedFundraisers != null) {
      res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found saved fundraisers from cache.',
        data: cachedSavedFundraisers,
      })

      return
    }

    // If no cached saved fundraisers are found then query the database.
    const savedFundraisers = await findSavedFundraisers({
      where: {
        userId: user.id,
      },
    })

    // If saved fundraisers are found then save them to cache.
    if (savedFundraisers.length > 0) {
      await setCachedFundraisersSavedByUserId(user.id, savedFundraisers)
    }

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
