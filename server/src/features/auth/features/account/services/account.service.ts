import type { Account, Prisma } from '@prisma/client'
import prismaClient from 'src/utils/prisma/prismaClient'

export default async function createAccount(
  data: Prisma.AccountCreateInput,
): Promise<Account> {
  return await prismaClient.account.create({
    data,
  })
}

export async function deleteAccount(
  where: Prisma.AccountWhereUniqueInput,
): Promise<Account> {
  return await prismaClient.account.delete({
    where,
  })
}

export async function findAccount(
  accountWhereUniqueInput: Prisma.AccountWhereUniqueInput,
): Promise<Account | null> {
  return await prismaClient.account.findUnique({
    where: accountWhereUniqueInput,
  })
}

export async function findAccounts(params: {
  skip?: number
  take?: number
  cursor?: Prisma.AccountWhereUniqueInput
  where?: Prisma.AccountWhereInput
  orderBy?: Prisma.AccountOrderByWithRelationInput
}): Promise<Account[]> {
  const { skip, take, cursor, where, orderBy } = params
  return await prismaClient.account.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  })
}

export async function updateAccount(params: {
  where: Prisma.AccountWhereUniqueInput
  data: Prisma.AccountUpdateInput
}): Promise<Account> {
  const { data, where } = params
  return await prismaClient.account.update({
    data,
    where,
  })
}
