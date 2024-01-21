import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findSavedFundraisers } from '../services/savedFundraiser.service.js'

// Gets all saved fundraisers by the current user from the prisma database.
export async function getUserSavedFundraisers(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  // Access handlers from the cache service.
  const cacheService = new CacheService()

  // Get user from session.
  const { session } = req
  const { user } = session

  try {
    // If no user is found return an error message.
    if (user == null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        status: ReasonPhrases.BAD_REQUEST,
        message: 'You must be signed in to perform this action.',
        data: null,
      })
    }

    // Get and return the saved fundraisers from the cache.
    const cachedSavedFundraisers = await cacheService.get(
      `${user.id}:saved-fundraisers`,
    )

    if (cachedSavedFundraisers !== null) {
      const data = JSON.parse(cachedSavedFundraisers)

      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found saved fundraisers from cache.',
        data,
      })
    }

    // If no cached saved fundraisers are found then query the database.
    const savedFundraisers = await findSavedFundraisers({
      where: {
        userId: user.id,
      },
    })

    // If saved fundraisers are found then save them to cache.
    if (savedFundraisers.length > 0) {
      await cacheService.setForTenMinutes(
        `${user.id}:saved-fundraisers`,
        savedFundraisers,
      )
    }

    // Return a success message.
    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found saved fundraisers from the database.',
      data: savedFundraisers,
    })
  } catch (error) {
    next(error)
  }
}
