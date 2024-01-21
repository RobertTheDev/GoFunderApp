import redisClient from '../../utils/redis/redisClient'

export async function getCachedCharity(key: string): Promise<string | null> {
  return await redisClient.get(key)
}

export async function setCachedCharity(params: {
  key: string
  value: any
  expiry: number
}): Promise<string | null> {
  const { key, value, expiry } = params

  return await redisClient.set(key, JSON.stringify(value), { EX: expiry })
}

export async function deleteCachedCharity(key: string): Promise<number> {
  return await redisClient.del(key)
}
