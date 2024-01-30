import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import prismaClient from '../../../utils/prisma/prismaClient.js'

export async function isFundraiserOwnerByFundraiserIdHandler(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<void> {
  // Get user from session.
  const { session, params } = req
  const { user } = session
  const { fundraiserId } = params

  try {
    if (user == null || user === undefined) {
      throw new Error('You must be signed in to perform this action.')
    }

    const isFundraiserOwner = await prismaClient.fundraiserOwner.findFirst({
      where: {
        userId: user.id,
        fundraiserId,
      },
    })

    if (isFundraiserOwner == null) {
      throw new Error('Unauthorised. You are not an owner of this fundraiser.')
    }

    // Return a success message.
    res.status(StatusCodes.OK).json({
      success: true,
      status: ReasonPhrases.OK,
      message: 'Successfully found fundraiser owner from the database.',
      data: isFundraiserOwner,
    })
  } catch (error) {
    next(error)
  }
}
