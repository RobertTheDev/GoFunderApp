import type { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import winstonLogger from '../../utils/winston/winstonLogger.js'
import type ResponseBody from '../../interfaces/ResponseBody.js'
import {
  findFundraiser,
  findFundraisers,
} from './services/fundraiser.service.js'

// Gets all users from the prisma database.
export async function getAllFundraisers(
  _req: Request,
  res: Response<ResponseBody>,
): Promise<Response<ResponseBody>> {
  try {
    // Fetches all the fundraisers from the database.
    const users = await findFundraisers({})

    // Return fundraisers with success response.
    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully fetched fundraisers from the database.',
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

// Gets a fundraiser by its id from the prisma database.
export async function getFundraiserById(
  req: Request,
  res: Response<ResponseBody>,
): Promise<Response<ResponseBody>> {
  // Get the id from the request params.
  const {
    params: { id: fundraiserId },
  } = req

  try {
    // Get user by id from the database.
    const user = await findFundraiser({ id: fundraiserId })

    // If no user is found log it and return no found response.
    if (user === null) {
      // Return not found response.
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        status: ReasonPhrases.NOT_FOUND,
        message: 'Could not fetch fundraiser with that id.',
        data: null,
      })
    }

    // Return fundraiser with successful response body.
    return res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found fundraiser from the database.',
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
