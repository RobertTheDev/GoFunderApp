import type { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes'
import type { Charity } from '@prisma/client'
import { CharityService } from './charity.service.js'
import winstonLogger from 'src/utils/winston/winstonLogger.js'
import { CacheService } from 'src/services/cache/cache.service.js'
import { cacheTtlOneDay } from 'src/configs/cacheTtl/index.js'

const charityService = new CharityService()
const cacheService = new CacheService()

export async function createCharity(
  req: Request,
  res: Response,
): Promise<void> {
  const { body } = req

  try {
    const charity = await charityService.createCharity(body)

    await cacheService.set({
      key: charity.id,
      value: charity,
      expiry: cacheTtlOneDay,
    })

    res.status(StatusCodes.CREATED).json(charity)
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}

// Gets all charities from the prisma database.
export async function getCharities(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const cachedCharities = await cacheService.get('charities')

    if (cachedCharities !== null) {
      res.status(StatusCodes.OK).json({
        reason: ReasonPhrases.OK,
        message: 'Successfully found charities from cache.',
        data: cachedCharities,
      })
    }

    const charities = await charityService.findCharities({})

    if (charities.length > 0) {
      await cacheService.set({
        key: 'charities',
        value: charities,
        expiry: cacheTtlOneDay,
      })
    }

    res.status(StatusCodes.OK).json({
      reason: ReasonPhrases.OK,
      message: 'Successfully found charities.',
      data: charities,
    })
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}

export async function getCharityById(
  req: Request,
  res: Response,
): Promise<void> {
  const {
    params: { id },
  } = req

  try {
    const cachedCharity = await cacheService.get(id)

    if (cachedCharity !== null) {
      res.status(StatusCodes.OK).json({
        reason: ReasonPhrases.OK,
        message: 'Successfully found charity from database.',
        data: cachedCharity,
      })
    }

    const charity: Charity | null = await charityService.findCharity({ id })

    if (charity !== null) {
      await cacheService.set({
        key: charity.id,
        value: charity,
        expiry: cacheTtlOneDay,
      })

      res.status(StatusCodes.OK).json({
        reason: ReasonPhrases.OK,
        message: 'Successfully found charity from database.',
        data: charity,
      })
    }

    res.status(StatusCodes.NOT_FOUND).json({
      reason: ReasonPhrases.NOT_FOUND,
      message: 'Charity not found.',
      data: null,
    })
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}

export async function updateCharityById(
  req: Request,
  res: Response,
): Promise<void> {
  const {
    body,
    params: { id },
  } = req

  try {
    const updatedCharity = await charityService.updateCharity({
      data: body,
      where: { id },
    })

    await cacheService.set({
      key: updatedCharity.id,
      value: updatedCharity,
      expiry: cacheTtlOneDay,
    })

    res.status(StatusCodes.OK).json({
      reason: ReasonPhrases.OK,
      message: 'Successfully updated charity.',
      data: updatedCharity,
    })
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}

export async function deleteCharityById(
  req: Request,
  res: Response,
): Promise<void> {
  const {
    params: { id },
  } = req

  try {
    await charityService.deleteCharity({
      id,
    })

    await cacheService.delete(id)

    res.status(StatusCodes.OK).json({
      reason: ReasonPhrases.OK,
      message: 'Successfully deleted charity.',
      data: null,
    })
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}
