import type { Charity, Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export class CharityService {
  private readonly prisma = new PrismaClient()

  async findCharity(
    charityWhereUniqueInput: Prisma.CharityWhereUniqueInput,
  ): Promise<Charity | null> {
    return await this.prisma.charity.findUnique({
      where: charityWhereUniqueInput,
    })
  }

  async findCharities(params: {
    skip?: number
    take?: number
    cursor?: Prisma.CharityWhereUniqueInput
    where?: Prisma.CharityWhereInput
    orderBy?: Prisma.CharityOrderByWithRelationInput
  }): Promise<Charity[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.charity.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createCharity(data: Prisma.CharityCreateInput): Promise<Charity> {
    return await this.prisma.charity.create({
      data,
    })
  }

  async updateCharity(params: {
    where: Prisma.CharityWhereUniqueInput
    data: Prisma.CharityUpdateInput
  }): Promise<Charity> {
    const { data, where } = params
    return await this.prisma.charity.update({
      data,
      where,
    })
  }

  async deleteCharity(where: Prisma.CharityWhereUniqueInput): Promise<Charity> {
    return await this.prisma.charity.delete({
      where,
    })
  }
}
