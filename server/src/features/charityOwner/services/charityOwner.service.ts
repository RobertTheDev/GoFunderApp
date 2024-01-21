import type { CharityOwner, Prisma } from '@prisma/client'
import prismaClient from 'src/utils/prisma/prismaClient'

export async function findCharityOwner(
  charityOwnerWhereUniqueInput: Prisma.CharityOwnerWhereUniqueInput,
): Promise<CharityOwner | null> {
  return await prismaClient.charityOwner.findUnique({
    where: charityOwnerWhereUniqueInput,
  })
}

export async function findCharityOwnerByInput(
  charityOwnerWhereInput: Prisma.CharityOwnerWhereInput,
): Promise<CharityOwner | null> {
  return await prismaClient.charityOwner.findFirst({
    where: charityOwnerWhereInput,
  })
}

export async function findCharityOwners(params: {
  skip?: number
  take?: number
  cursor?: Prisma.CharityOwnerWhereUniqueInput
  where?: Prisma.CharityOwnerWhereInput
  orderBy?: Prisma.CharityOwnerOrderByWithRelationInput
}): Promise<CharityOwner[]> {
  const { skip, take, cursor, where, orderBy } = params
  return await prismaClient.charityOwner.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  })
}

export async function createCharityOwner({
  charityId,
  userId,
}: {
  charityId: string
  userId: string
}): Promise<CharityOwner> {
  return await prismaClient.charityOwner.create({
    data: {
      charityId,
      userId,
    },
  })
}

export async function deleteCharityOwner(
  where: Prisma.CharityOwnerWhereUniqueInput,
): Promise<CharityOwner> {
  return await prismaClient.charityOwner.delete({
    where,
  })
}

export async function deleteCharityOwnersByInput(
  where: Prisma.CharityOwnerWhereInput,
): Promise<Prisma.BatchPayload> {
  return await prismaClient.charityOwner.deleteMany({
    where,
  })
}
