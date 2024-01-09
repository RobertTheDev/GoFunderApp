import z from 'zod'

export const createCharitySchema = z.object({
  category: z.string({ required_error: 'name is required' }),
  description: z.string({ required_error: 'name is required' }),
  logoUrl: z.string({ required_error: 'name is required' }),
  name: z.string({ required_error: 'name is required' }),
})

export const updateCharitySchema = z.object({
  category: z.string({ required_error: 'name is required' }).optional(),
  description: z.string({ required_error: 'name is required' }).optional(),
  logoUrl: z.string({ required_error: 'name is required' }).optional(),
  name: z.string({ required_error: 'name is required' }).optional(),
})
