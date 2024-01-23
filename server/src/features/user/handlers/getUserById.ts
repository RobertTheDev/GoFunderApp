import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findUser } from '../services/user.service.js'
import { type User } from '@prisma/client'

function excludeUserFields(
  user: User,
  keys: string[],
): Record<string, string | number | boolean | Date | null> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  )
}

// Gets a user by its id from the prisma database.
export async function getUserByIdHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
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
      throw new Error('No user matched the provided ID.')
    }

    const userWithoutPassword = excludeUserFields(user, [
      'password',
      'mfaSecret',
      'mfaType',
    ])

    // Return user with successful response body.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found user from the database.',
      data: userWithoutPassword,
    })
  } catch (error) {
    next(error)
  }
}
