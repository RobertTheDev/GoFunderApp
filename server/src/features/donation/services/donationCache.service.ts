import type { Donation } from '@prisma/client'
import redisClient from '../../../utils/redis/redisClient'

export async function getCachedDonationsByCharityId(
  charityId: string,
): Promise<Donation[] | null> {
  const cachedDonations = await redisClient.get(
    `charity-donations-${charityId}`,
  )

  if (cachedDonations == null) {
    return null
  }

  return JSON.parse(cachedDonations)
}

export async function getCachedDonationsByUserId(
  userId: string,
): Promise<Donation[] | null> {
  const cachedDonations = await redisClient.get(`user-donations-${userId}`)

  if (cachedDonations == null) {
    return null
  }

  return JSON.parse(cachedDonations)
}

export async function setCachedDonationsByCharityId(
  charityId: string,
  data: Donation[],
): Promise<string | null> {
  const cachedDonations = JSON.stringify(data)

  return await redisClient.set(
    `charity-donations-${charityId}`,
    cachedDonations,
  )
}

export async function setCachedDonationsByUserId(
  userId: string,
  data: Donation[],
): Promise<string | null> {
  const cachedDonations = JSON.stringify(data)

  return await redisClient.set(`user-donations-${userId}`, cachedDonations)
}
