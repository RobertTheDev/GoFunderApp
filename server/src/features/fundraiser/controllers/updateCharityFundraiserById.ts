import type { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes'
import winstonLogger from '../../../utils/winston/winstonLogger.js'
import { FundraiserService } from '../fundraiser.service.js'
import updateFundraiserSchema from '../validators/updateFundraiser.schema.js'

export async function updateCharityFundraiserById(
  req: Request,
  res: Response,
): Promise<any> {
  const { body, params, session } = req
  const { fundraiserId } = params
  const { user } = session

  const fundraiserService = new FundraiserService()

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

    const validation = await updateFundraiserSchema.safeParseAsync(body)

    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    const fundraiser = await fundraiserService.findFundraiser({
      id: fundraiserId,
    })

    if (fundraiser == null) {
      throw new Error('No fundraiser found.')
    }

    if (fundraiser.userId !== user.id) {
      throw new Error('Unauthorised. You are not the fundraiser owner.')
    }

    const updatedFundraiser = await fundraiserService.updateFundraiser({
      where: { id: fundraiserId },
      data: validation.data,
    })

    res.status(StatusCodes.OK).json(updatedFundraiser)
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}
