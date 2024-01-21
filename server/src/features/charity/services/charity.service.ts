import type { Charity, Prisma } from '@prisma/client'
import prismaClient from '../../../utils/prisma/prismaClient'

export async function findCharity(
  charityWhereUniqueInput: Prisma.CharityWhereUniqueInput,
): Promise<Charity | null> {
  return await prismaClient.charity.findUnique({
    where: charityWhereUniqueInput,
    include: {
      fundraisers: true,
    },
  })
}

export async function findCharities(params: {
  skip?: number
  take?: number
  cursor?: Prisma.CharityWhereUniqueInput
  where?: Prisma.CharityWhereInput
  orderBy?: Prisma.CharityOrderByWithRelationInput
}): Promise<Charity[]> {
  const { skip, take, cursor, where, orderBy } = params
  return await prismaClient.charity.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  })
}

export async function createCharity(
  data: Prisma.CharityCreateInput,
): Promise<Charity> {
  return await prismaClient.charity.create({
    data,
  })
}

export async function updateCharity(params: {
  where: Prisma.CharityWhereUniqueInput
  data: Prisma.CharityUpdateInput
}): Promise<Charity> {
  const { data, where } = params
  return await prismaClient.charity.update({
    data,
    where,
  })
}

export async function deleteCharity(
  where: Prisma.CharityWhereUniqueInput,
): Promise<Charity> {
  return await prismaClient.charity.delete({
    where,
  })
}
