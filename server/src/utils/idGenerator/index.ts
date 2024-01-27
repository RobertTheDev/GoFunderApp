import { nanoid } from 'nanoid'

// Generates a unique ID using nanoid.
export default function generateId(): string {
  return nanoid()
}
