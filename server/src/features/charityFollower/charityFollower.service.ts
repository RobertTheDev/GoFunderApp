import type { CharityFollower, Prisma } from '@prisma/client'
import prismaClient from '../../utils/prisma/prismaClient'

export async function findCharityFollower(
  charityFollowerWhereInput: Prisma.CharityFollowerWhereInput,
): Promise<CharityFollower | null> {
  return await prismaClient.charityFollower.findFirst({
    where: charityFollowerWhereInput,
  })
}

export async function findCharityFollowers(params: {
  skip?: number
  take?: number
  cursor?: Prisma.CharityFollowerWhereUniqueInput
  where?: Prisma.CharityFollowerWhereInput
  orderBy?: Prisma.CharityFollowerOrderByWithRelationInput
}): Promise<CharityFollower[]> {
  const { skip, take, cursor, where, orderBy } = params
  return await prismaClient.charityFollower.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  })
}

export async function createCharityFollower({
  charityId,
  userId,
}: {
  charityId: string
  userId: string
}): Promise<CharityFollower> {
  return await prismaClient.charityFollower.create({
    data: { userId, charityId },
  })
}

export async function deleteCharityFollower(
  where: Prisma.CharityFollowerWhereUniqueInput,
): Promise<CharityFollower> {
  return await prismaClient.charityFollower.delete({
    where,
  })
}
