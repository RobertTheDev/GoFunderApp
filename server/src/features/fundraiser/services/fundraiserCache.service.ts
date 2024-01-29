import type { Fundraiser } from '@prisma/client'
import redisClient from '../../../utils/redis/redisClient.js'

export async function deleteCachedFundraiserBySlug(
  slug: string,
): Promise<number> {
  return await redisClient.del(`fundraiser:${slug}`)
}

export async function getCachedFundraiserBySlug(
  slug: string,
): Promise<Fundraiser | null> {
  const cachedFundraiser = await redisClient.get(`fundraiser:${slug}`)

  if (cachedFundraiser == null) {
    return null
  }

  return JSON.parse(cachedFundraiser)
}

export async function setCachedFundraiserBySlug(
  slug: string,
  data: any,
): Promise<string | null> {
  const cachedFundraiser = JSON.stringify(data)

  return await redisClient.set(`fundraiser:${slug}`, cachedFundraiser)
}

export async function deleteCachedFundraisersByUserId(
  userId: string,
): Promise<number> {
  return await redisClient.del(`fundraiser-user-${userId}`)
}

export async function getCachedFundraisersByUserId(
  userId: string,
): Promise<Fundraiser[] | null> {
  const cachedFundraisers = await redisClient.get(`fundraisers-user-${userId}`)

  if (cachedFundraisers == null) {
    return null
  }

  return JSON.parse(cachedFundraisers)
}

export async function setCachedFundraisersByUserId(
  userId: string,
  data: any,
): Promise<string | null> {
  const cachedFundraisers = JSON.stringify(data)

  return await redisClient.set(
    `fundraisers-user-${userId}`,
    cachedFundraisers,
    {
      EX: 6000,
    },
  )
}

export async function deleteCachedFundraisersByCharityId(
  charityId: string,
): Promise<number> {
  return await redisClient.del(`fundraisers-charity-${charityId}`)
}

export async function getCachedFundraisersByCharityId(
  charityId: string,
): Promise<Fundraiser[] | null> {
  const cachedFundraisers = await redisClient.get(
    `fundraisers-charity-${charityId}`,
  )

  if (cachedFundraisers == null) {
    return null
  }

  return JSON.parse(cachedFundraisers)
}

export async function setCachedFundraisersByCharityId(
  charityId: string,
  data: any,
): Promise<string | null> {
  const cachedFundraisers = JSON.stringify(data)

  return await redisClient.set(
    `fundraisers-charity-${charityId}`,
    cachedFundraisers,
    {
      EX: 6000,
    },
  )
}

export async function getCachedFundraisers(): Promise<Fundraiser[] | null> {
  const cachedFundraisers = await redisClient.get(`cached-fundraisers`)

  if (cachedFundraisers == null) {
    return null
  }

  return JSON.parse(cachedFundraisers)
}

export async function setCachedFundraisers(data: any): Promise<string | null> {
  const cachedFundraisers = JSON.stringify(data)

  return await redisClient.set(`cached-fundraisers`, cachedFundraisers, {
    EX: 6000,
  })
}

export async function getCachedFundraisersByCategory(
  category: string,
): Promise<Fundraiser[] | null> {
  const cachedFundraisers = await redisClient.get(`fundraisers:${category}`)

  if (cachedFundraisers == null) {
    return null
  }

  return JSON.parse(cachedFundraisers)
}

export async function setCachedFundraisersByCategory(
  category: string,
  data: any,
): Promise<string | null> {
  const cachedFundraisers = JSON.stringify(data)

  return await redisClient.set(`fundraisers:${category}`, cachedFundraisers, {
    EX: 6000,
  })
}
