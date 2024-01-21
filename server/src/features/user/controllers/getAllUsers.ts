import type { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winstonLogger from '../../../utils/winston/winstonLogger.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findUsers } from '../services/user.service.js'

// Gets all users from the prisma database.
export async function getAllUsers(
  _req: Request,
  res: Response<ResponseBody>,
): Promise<Response<ResponseBody>> {
  try {
    // Fetches all the users from the database.
    const users = await findUsers({})

    // Return users with sucess response.
    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully fetched users from the database.',
      data: users,
    })
  } catch (error) {
    // Log the error.
    winstonLogger.error(error)

    // Return error response.
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message:
        'There was an error trying to perform this action. Please try again.',
      data: null,
    })
  }
}
