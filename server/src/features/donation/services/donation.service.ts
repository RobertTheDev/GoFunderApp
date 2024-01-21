import type { Donation, Prisma } from '@prisma/client'
import prismaClient from '../../../utils/prisma/prismaClient'

export async function findDonations(params: {
  skip?: number
  take?: number
  cursor?: Prisma.DonationWhereUniqueInput
  where?: Prisma.DonationWhereInput
  orderBy?: Prisma.DonationOrderByWithRelationInput
}): Promise<Donation[]> {
  const { skip, take, cursor, where, orderBy } = params
  return await prismaClient.donation.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  })
}

export async function createDonation(
  data: Prisma.DonationCreateInput,
): Promise<Donation> {
  return await prismaClient.donation.create({
    data,
  })
}

export async function updateDonation(params: {
  where: Prisma.DonationWhereUniqueInput
  data: Prisma.DonationUpdateInput
}): Promise<Donation> {
  const { data, where } = params
  return await prismaClient.donation.update({
    data,
    where,
  })
}

export async function deleteDonation(
  where: Prisma.DonationWhereUniqueInput,
): Promise<Donation> {
  return await prismaClient.donation.delete({
    where,
  })
}