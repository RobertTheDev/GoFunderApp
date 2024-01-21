import type { User } from '@prisma/client'
import redisClient from '../../../utils/redis/redisClient'

export async function deleteCachedUserByUsername(
  username: string,
): Promise<number> {
  return await redisClient.del(`user-${username}`)
}

export async function getCachedUserByUsername(
  username: string,
): Promise<User | null> {
  const cachedUser = await redisClient.get(`user-${username}`)

  if (cachedUser == null) {
    return null
  }

  return JSON.parse(cachedUser)
}

export async function setCachedUserByUsername(
  username: string,
  data: User,
): Promise<string | null> {
  const cachedUser = JSON.stringify(data)

  return await redisClient.set(`user-${username}`, cachedUser)
}
