import redisClient from '../../../utils/redis/redisClient'

export async function deleteCachedCharity(key: string): Promise<number> {
  return await redisClient.del(key)
}

export async function getCachedCharities(key: string): Promise<string | null> {
  return await redisClient.get(key)
}

export async function getCachedCharity(key: string): Promise<string | null> {
  return await redisClient.get(key)
}

export async function setCachedCharities(
  key: string,
  value: any,
): Promise<string | null> {
  return await redisClient.set(key, JSON.stringify(value))
}

export async function setCachedCharity(
  key: string,
  value: any,
): Promise<string | null> {
  return await redisClient.set(key, JSON.stringify(value))
}
