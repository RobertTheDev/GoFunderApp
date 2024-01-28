import type IProfile from '../../../interfaces/Profile'
import redisClient from '../../../utils/redis/redisClient'

export async function deleteCachedProfileByUsername(
  username: string,
): Promise<number> {
  return await redisClient.del(`profile-${username}`)
}

export async function getCachedProfileByUsername(
  username: string,
): Promise<IProfile | null> {
  const cachedProfile = await redisClient.get(`profile:${username}`)

  if (cachedProfile == null) {
    return null
  }

  return JSON.parse(cachedProfile)
}

export async function setCachedUserByUsername(
  username: string,
  data: any,
): Promise<string | null> {
  const cachedProfile = JSON.stringify(data)

  return await redisClient.set(`profile:${username}`, cachedProfile)
}
