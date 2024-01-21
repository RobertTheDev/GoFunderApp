import type { CharityOwner, Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export class CharityOwnerService {
  private readonly prisma = new PrismaClient()

  async findCharityOwner(
    charityOwnerWhereUniqueInput: Prisma.CharityOwnerWhereUniqueInput,
  ): Promise<CharityOwner | null> {
    return await this.prisma.charityOwner.findUnique({
      where: charityOwnerWhereUniqueInput,
    })
  }

  async findCharityOwnerByInput(
    charityOwnerWhereInput: Prisma.CharityOwnerWhereInput,
  ): Promise<CharityOwner | null> {
    return await this.prisma.charityOwner.findFirst({
      where: charityOwnerWhereInput,
    })
  }

  async findCharityOwners(params: {
    skip?: number
    take?: number
    cursor?: Prisma.CharityOwnerWhereUniqueInput
    where?: Prisma.CharityOwnerWhereInput
    orderBy?: Prisma.CharityOwnerOrderByWithRelationInput
  }): Promise<CharityOwner[]> {
    const { skip, take, cursor, where, orderBy } = params
    return await this.prisma.charityOwner.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createCharityOwner({
    charityId,
    userId,
  }: {
    charityId: string
    userId: string
  }): Promise<CharityOwner> {
    return await this.prisma.charityOwner.create({
      data: {
        charityId,
        userId,
      },
    })
  }

  async deleteCharityOwner(
    where: Prisma.CharityOwnerWhereUniqueInput,
  ): Promise<CharityOwner> {
    return await this.prisma.charityOwner.delete({
      where,
    })
  }

  async deleteCharityOwnersByInput(
    where: Prisma.CharityOwnerWhereInput,
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.charityOwner.deleteMany({
      where,
    })
  }
}
