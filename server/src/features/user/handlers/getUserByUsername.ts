import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { findUser } from '../services/user.service.js'
import { type User } from '@prisma/client'
import {
  getCachedUserByUsername,
  setCachedUserByUsername,
} from '../services/userCache.service.js'

function excludeUserFields(
  user: User,
  keys: string[],
): Record<string, string | number | boolean | Date | null> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  )
}

// Gets a user by its id from the prisma database.
export async function getUserByUsernameHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  // Get the id from the request params.
  const {
    params: { username },
  } = req

  try {
    if (username == null || username === undefined) {
      throw new Error('No user was found with the provided username.')
    }

    const cachedUser = await getCachedUserByUsername(username)

    if (cachedUser != null) {
      res.status(StatusCodes.OK).json({
        success: true,
        status: ReasonPhrases.OK,
        message: 'Successfully found user from the cache.',
        data: cachedUser,
      })

      return
    }

    // Get user by username from the database.
    const user = await findUser({ username })

    // If no user is found log it and return no found response.
    if (user == null) {
      throw new Error('No user was found with that username.')
    }

    const userWithoutPassword = excludeUserFields(user, [
      'password',
      'mfaSecret',
      'mfaType',
    ])

    // Save user into cache with username.
    await setCachedUserByUsername(username, userWithoutPassword)

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
