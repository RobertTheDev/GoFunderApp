import { type Prisma } from '@prisma/client'
import prismaClient from '../../utils/prisma/prismaClient'

export async function countUsersByUsername(username: string): Promise<number> {
  return await prismaClient.user.count({ where: { username } })
}

// Returns a user from prisma database.
export async function findUser(
  userWhereUniqueInput: Prisma.UserWhereUniqueInput,
): Promise<{
  id: string
  annonymous: boolean
  createdAt: Date
  defaultCurrency: string
  name: string
  image: string | null
  mfaType: string | null
  totalCharitesOwned: number
  totalDonationsAmount: number
  totalDonationsMade: number
  totalFundraisersOwned: number
} | null> {
  return await prismaClient.user.findUnique({
    where: userWhereUniqueInput,
    select: {
      id: true,
      annonymous: true,
      createdAt: true,
      defaultCurrency: true,
      image: true,
      mfaType: true,
      name: true,
      totalCharitesOwned: true,
      totalDonationsAmount: true,
      totalDonationsMade: true,
      totalFundraisersOwned: true,
    },
  })
}

// Returns all users from prisma database.
export async function findUsers(params: {
  skip?: number
  take?: number
  cursor?: Prisma.UserWhereUniqueInput
  where?: Prisma.UserWhereInput
  orderBy?: Prisma.UserOrderByWithRelationInput
}): Promise<
  Array<{
    id: string
    annonymous: boolean
    createdAt: Date
    defaultCurrency: string
    name: string
    image: string | null
    mfaType: string | null
    totalCharitesOwned: number
    totalDonationsAmount: number
    totalDonationsMade: number
    totalFundraisersOwned: number
  }>
> {
  const { skip, take, cursor, where, orderBy } = params
  return await prismaClient.user.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
    select: {
      id: true,
      annonymous: true,
      createdAt: true,
      defaultCurrency: true,
      image: true,
      mfaType: true,
      name: true,
      totalCharitesOwned: true,
      totalDonationsAmount: true,
      totalDonationsMade: true,
      totalFundraisersOwned: true,
    },
  })
}
