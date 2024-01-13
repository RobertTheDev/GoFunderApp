import type { User, Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

export class UserService {
  private readonly prisma = new PrismaClient()

  async findUsers(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }
}
