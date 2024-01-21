import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { createCharityFollowerSchema } from '../charityFollower.validators.js'
import {
  createCharityFollower,
  deleteCharityFollower,
  findCharityFollower,
} from '../services/charityFollower.service.js'

// This handler searches for a followed charity and either
// creates or deletes one by user and charity id.

export async function followCharity(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  // Get charity id from request params and user from session.
  const { params, session } = req
  const { charityId: id } = params
  const { user } = session

  try {
    // If no user is in session return an error.
    if (user == null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        status: ReasonPhrases.BAD_REQUEST,
        message: 'You must be signed in to perform this action.',
        data: null,
      })
    }

    // Validate the request body using the validation schema.
    const validation = await createCharityFollowerSchema.safeParseAsync({
      userId: user.id,
      charityId: id,
    })

    // If validation is unsuccessful return an error.
    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    // Get charity and user ID from validated data.
    const { charityId, userId } = validation.data

    // Find a followed charity with validated data.
    const findFollowedCharity = await findCharityFollower({ charityId, userId })

    // If followed charity does not exist then create it.
    if (findFollowedCharity === null) {
      const followedCharity = await createCharityFollower({
        charityId,
        userId,
      })

      // Return the followed charity and return success message.
      return res.status(StatusCodes.CREATED).json({
        success: true,
        status: ReasonPhrases.CREATED,
        message: 'Successfully followed charity.',
        data: followedCharity,
      })
    }

    // If there is a followed charity then delete it.
    await deleteCharityFollower({
      id: findFollowedCharity.id,
    })

    // Return the success message.
    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully unfollowed charity.',
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
