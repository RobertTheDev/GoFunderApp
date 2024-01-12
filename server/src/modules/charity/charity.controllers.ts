import type { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes, getReasonPhrase } from 'http-status-codes'
import type { Charity } from '@prisma/client'
import { CharityService } from './charity.service.js'
import winstonLogger from '../../utils/winston/winstonLogger.js'
import { CacheService } from '../../services/cache/cache.service.js'
import { cacheTtlOneDay } from '../../configs/cacheTtl/index.js'
import {
  createCharitySchema,
  updateCharitySchema,
} from './charity.validators.js'

const charityService = new CharityService()
const cacheService = new CacheService()

export async function createCharity(
  req: Request,
  res: Response,
): Promise<void> {
  const { body } = req

  try {
    const validation = await createCharitySchema.safeParseAsync(body)

    if (validation.success) {
      const charity = await charityService.createCharity(validation.data)

      await cacheService.set({
        key: charity.id,
        value: charity,
        expiry: cacheTtlOneDay,
      })

      res.status(StatusCodes.CREATED).json(charity)
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(validation.error)
    }
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
): Promise<Response<any, Record<string, any>>> {
  try {
    const cachedCharities = await cacheService.get('charities')

    if (cachedCharities !== null) {
      return res.status(StatusCodes.OK).json({
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

    return res.status(StatusCodes.OK).json({
      reason: ReasonPhrases.OK,
      message: 'Successfully found charities.',
      data: charities,
    })
  } catch (error) {
    winstonLogger.error(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
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
    if (id !== undefined) {
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
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        reason: ReasonPhrases.BAD_REQUEST,
        message: 'Charity not found.',
        data: null,
      })
    }
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
    const validation = await updateCharitySchema.safeParseAsync(body)

    if (validation.success) {
      const updatedCharity = await charityService.updateCharity({
        data: validation.data,
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
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        reason: ReasonPhrases.BAD_REQUEST,
        message: 'Successfully updated charity.',
        data: null,
      })
    }
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
    if (id !== undefined) {
      await charityService.deleteCharity({
        id,
      })

      await cacheService.delete(id)

      res.status(StatusCodes.OK).json({
        reason: ReasonPhrases.OK,
        message: 'Successfully deleted charity.',
        data: null,
      })
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        reason: ReasonPhrases.BAD_REQUEST,
        message: 'Successfully deleted charity.',
        data: null,
      })
    }
  } catch (error) {
    winstonLogger.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    })
  }
}
