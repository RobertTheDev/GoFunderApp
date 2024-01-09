import bcrypt from 'bcrypt'

export async function comparePassword(
  inputPassword: string,
  correctPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, correctPassword)
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
}
