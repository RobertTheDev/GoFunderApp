import type { Donation, Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export class DonationService {
  private readonly prisma = new PrismaClient()

  async findDonations(params: {
    skip?: number
    take?: number
    cursor?: Prisma.DonationWhereUniqueInput
    where?: Prisma.DonationWhereInput
    orderBy?: Prisma.DonationOrderByWithRelationInput
  }): Promise<Donation[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.donation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createDonation(data: Prisma.DonationCreateInput): Promise<Donation> {
    return await this.prisma.donation.create({
      data,
    })
  }

  async updateDonation(params: {
    where: Prisma.DonationWhereUniqueInput
    data: Prisma.DonationUpdateInput
  }): Promise<Donation> {
    const { data, where } = params
    return await this.prisma.donation.update({
      data,
      where,
    })
  }

  async deleteDonation(
    where: Prisma.DonationWhereUniqueInput,
  ): Promise<Donation> {
    return await this.prisma.donation.delete({
      where,
    })
  }
}
