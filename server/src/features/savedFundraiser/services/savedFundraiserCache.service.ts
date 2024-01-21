import type { CharityFollower } from '@prisma/client'
import redisClient from '../../../utils/redis/redisClient'

export async function deleteCachedFundraisersSavedByUserId(
  userId: string,
): Promise<number> {
  return await redisClient.del(`fundraisers-saved-${userId}`)
}

export async function getCachedFundraisersSavedByUserId(
  userId: string,
): Promise<CharityFollower[] | null> {
  const cachedSavedFundraisers = await redisClient.get(
    `fundraisers-saved-${userId}`,
  )

  if (cachedSavedFundraisers == null) {
    return null
  }

  return JSON.parse(cachedSavedFundraisers)
}

export async function setCachedFundraisersSavedByUserId(
  userId: string,
  data: CharityFollower[],
): Promise<string | null> {
  const cachedSavedFundraisers = JSON.stringify(data)

  return await redisClient.set(
    `fundraisers-saved-${userId}`,
    cachedSavedFundraisers,
  )
}
