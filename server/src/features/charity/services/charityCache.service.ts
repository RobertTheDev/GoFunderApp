import type { Charity } from '@prisma/client'
import redisClient from '../../../utils/redis/redisClient'

export async function deleteCachedCharityBySlug(slug: string): Promise<number> {
  return await redisClient.del(`charity-${slug}`)
}

export async function getCachedCharityBySlug(
  slug: string,
): Promise<Charity | null> {
  const cachedCharity = await redisClient.get(`charity-${slug}`)

  if (cachedCharity == null) {
    return null
  }

  return JSON.parse(cachedCharity)
}

export async function getCachedCharities(): Promise<Charity[] | null> {
  const cachedCharities = await redisClient.get(`cached-charities`)

  if (cachedCharities == null) {
    return null
  }

  return JSON.parse(cachedCharities)
}

export async function setCachedCharities(
  data: Charity[],
): Promise<string | null> {
  const cachedCharities = JSON.stringify(data)

  return await redisClient.set(`cached-charities`, cachedCharities, {
    EX: 6000,
  })
}

export async function setCachedCharityBySlug(
  slug: string,
  data: Charity,
): Promise<string | null> {
  const cachedCharity = JSON.stringify(data)

  return await redisClient.set(`charity-${slug}`, cachedCharity)
}
