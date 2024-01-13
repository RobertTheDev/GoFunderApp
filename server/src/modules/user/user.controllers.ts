import type { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes'
import winstonLogger from '../../utils/winston/winstonLogger.js'
import { UserService } from './user.service.js'

const userService = new UserService()

// Gets all users from the prisma database.
export async function getAllUsers(
  _req: Request,
  res: Response,
): Promise<Response<any>> {
  try {
    const users = await userService.findUsers({})

    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: 'Successfully found all users.',
      data: users,
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}
