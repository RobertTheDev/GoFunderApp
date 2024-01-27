import { type User, type Prisma } from '@prisma/client'
import prismaClient from '../../../../../utils/prisma/prismaClient'

export async function countUsersByUsername(username: string): Promise<number> {
  return await prismaClient.user.count({ where: { username } })
}

// Deletes a user from prisma database.
export async function deleteUser(
  userWhereUniqueInput: Prisma.UserWhereUniqueInput,
): Promise<User | null> {
  return await prismaClient.user.delete({
    where: userWhereUniqueInput,
  })
}

// Returns a user from prisma database.
export async function findUser(
  userWhereUniqueInput: Prisma.UserWhereUniqueInput,
): Promise<User | null> {
  return await prismaClient.user.findUnique({
    where: userWhereUniqueInput,
  })
}

// Returns a user from prisma database.
export async function findUserById(id: string): Promise<User | null> {
  return await prismaClient.user.findUnique({
    where: { id },
  })
}

// Returns all users from prisma database.
export async function findUsers(params: {
  skip?: number
  take?: number
  cursor?: Prisma.UserWhereUniqueInput
  where?: Prisma.UserWhereInput
  orderBy?: Prisma.UserOrderByWithRelationInput
}): Promise<User[]> {
  const { skip, take, cursor, where, orderBy } = params
  return await prismaClient.user.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  })
}
