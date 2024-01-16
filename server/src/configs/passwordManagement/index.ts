import argon2 from 'argon2'
import crypto from 'crypto'

const pepper = process.env.PASSWORD_PEPPER

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await argon2.verify(hashedPassword, password + pepper)
}

export async function hashPassword(password: string): Promise<string> {
  const salt: Buffer = crypto.randomBytes(32)

  return await argon2.hash(password + pepper, { salt })
}
