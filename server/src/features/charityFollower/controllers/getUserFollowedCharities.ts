import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findCharityFollowers } from '../services/charityFollower.service.js'

// Gets all followed charities by the current user from the prisma database.
export async function getUserFollowedCharities(
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

    // Get and return the followed charities from the cache.
    const cachedFollowedCharities = await cacheService.get(
      `${user.id}:followed-charities`,
    )

    if (cachedFollowedCharities !== null) {
      const data = JSON.parse(cachedFollowedCharities)

      return res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found followed charities from cache.',
        data,
      })
    }

    // If no cached charities are found then query the database.
    const followedCharities = await findCharityFollowers({
      where: {
        userId: user.id,
      },
    })

    // If followed charities are found then save them to cache.
    if (followedCharities.length > 0) {
      await cacheService.setForTenMinutes(
        `${user.id}:followed-charities`,
        followedCharities,
      )
    }

    // Return a success message.
    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found followed charities from the database.',
      data: followedCharities,
    })
  } catch (error) {
    next(error)
  }
}
