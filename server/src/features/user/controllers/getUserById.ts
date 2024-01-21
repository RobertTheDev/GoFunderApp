import type { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winstonLogger from '../../../utils/winston/winstonLogger.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findUser } from '../user.service.js'

// Gets a user by its id from the prisma database.
export async function getUserById(
  req: Request,
  res: Response<ResponseBody>,
): Promise<Response<ResponseBody>> {
  // Get the id from the request params.
  const {
    params: { id: userId },
  } = req

  try {
    // Get user by id from the database.
    const user = await findUser({ id: userId })

    // If no user is found log it and return no found response.
    if (user === null) {
      // Return not found response.
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        status: ReasonPhrases.NOT_FOUND,
        message: 'Could not fetch user with that id.',
        data: null,
      })
    }

    // Return user with successful response body.
    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found user from the database.',
      data: user,
    })
  } catch (error) {
    /// Log the error.
    winstonLogger.error(error)

    // Return the error response.
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message:
        'There was an error trying to perform this action. Please try again.',
      data: null,
    })
  }
}
