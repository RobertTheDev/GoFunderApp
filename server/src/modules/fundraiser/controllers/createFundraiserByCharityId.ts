import type { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { CacheService } from '../../../services/cache/cache.service.js'
import type ResponseBody from '../../../interfaces/ResponseBody.js'
import { FundraiserService } from '../fundraiser.service.js'
import { CharityService } from '../../../modules/charity/charity.service.js'
import { CharityOwnerService } from '../../../modules/charityOwner/charityOwner.service.js'
import createCharityFundraiserSchema from '../validators/createCharityFundraiser.schema.js'

// This handler creates a fundraiser with a charity id.

export async function createFundraiserByCharityId(
  req: Request,
  res: Response<ResponseBody>,
  next: NextFunction,
): Promise<any> {
  const { body, session } = req
  const { user } = session

  const charityService = new CharityService()
  const charityOwnerService = new CharityOwnerService()
  const fundraiserService = new FundraiserService()
  const cacheService = new CacheService()

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
    const validation = await createCharityFundraiserSchema.safeParseAsync(body)

    // If validation is unsuccessful return an error.
    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message)
    }

    const { charityId } = validation.data

    // Check charity exists and that user is an owner.
    const charity = await charityService.findCharity({ id: charityId })

    if (charity === null) {
      throw new Error('No charity was found matching the charity ID.')
    }

    const isCharityOwner = await charityOwnerService.deleteCharityOwnersByInput(
      {
        charityId,
        userId: user.id,
      },
    )

    if (isCharityOwner === null) {
      throw new Error('Unauthroised. You are not an owner of this company.')
    }

    // Create a fundraiser with validated data.
    const createdFundraiser = await fundraiserService.createFundraiser(
      validation.data,
    )

    // Cache the created fundraiser for one day.
    await cacheService.setForOneDay(createdFundraiser.id, createdFundraiser)

    // Return the created fundraiser and success message.
    return res.status(StatusCodes.CREATED).json({
      success: true,
      status: ReasonPhrases.CREATED,
      message: 'Successfully created fundraiser.',
      data: createdFundraiser,
    })
  } catch (error) {
    next(error)
  }
}
