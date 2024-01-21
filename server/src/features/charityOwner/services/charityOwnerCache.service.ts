import type { CharityOwner } from '@prisma/client'
import redisClient from '../../../utils/redis/redisClient'

export async function deleteCachedCharitiesOwnedByUserId(
  userId: string,
): Promise<number> {
  return await redisClient.del(`charities-owned-${userId}`)
}

export async function getCachedCharitiesOwnedByUserId(
  userId: string,
): Promise<CharityOwner[] | null> {
  const cachedOwnedCharities = await redisClient.get(
    `charities-owned-${userId}`,
  )

  if (cachedOwnedCharities == null) {
    return null
  }

  return JSON.parse(cachedOwnedCharities)
}

export async function setCachedCharitiesOwnedByUserId(
  userId: string,
  data: CharityOwner[],
): Promise<string | null> {
  const cachedOwnedDonations = JSON.stringify(data)

  return await redisClient.set(
    `charities-owned-${userId}`,
    cachedOwnedDonations,
  )
}
