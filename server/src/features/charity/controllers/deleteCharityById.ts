import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CharityService } from '../charity.service.js'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { deleteCharityOwnersByInput } from '../../../features/charityOwner/charityOwner.service.js'

// The handler deletes a charity and its owners.

export async function deleteCharityById(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { params, session } = req
  const { id } = params
  const { user } = session

  const charityService = new CharityService()
  const cacheService = new CacheService()

  try {
    // If no ID was provided throw an error.
    if (id === undefined) {
      throw new Error('No charity ID was provided.')
    }

    // If no user is in session return an error.
    if (user == null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        status: ReasonPhrases.BAD_REQUEST,
        message: 'You must be signed in to perform this action.',
        data: null,
      })
    }

    // Delete the charity from the database.
    await charityService.deleteCharity({
      id,
    })

    // Delete the charity owners from the database.
    await deleteCharityOwnersByInput({ id })

    // Delete the charity from cache.
    await cacheService.delete(id)

    // Return success message.
    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully deleted charity.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
