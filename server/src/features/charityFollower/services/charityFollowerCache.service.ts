import type { CharityFollower } from '@prisma/client'
import redisClient from '../../../utils/redis/redisClient'

export async function deleteCachedCharitiesFollowedByUserId(
  userId: string,
): Promise<number> {
  return await redisClient.del(`charities-owned-${userId}`)
}

export async function getCachedCharitiesFollowedByUserId(
  userId: string,
): Promise<CharityFollower[] | null> {
  const cachedFollowedCharities = await redisClient.get(
    `charities-followed-${userId}`,
  )

  if (cachedFollowedCharities == null) {
    return null
  }

  return JSON.parse(cachedFollowedCharities)
}

export async function setCachedCharitiesFollowedByUserId(
  userId: string,
  data: CharityFollower[],
): Promise<string | null> {
  const cachedFollowedCharities = JSON.stringify(data)

  return await redisClient.set(
    `charities-followed-${userId}`,
    cachedFollowedCharities,
  )
}
