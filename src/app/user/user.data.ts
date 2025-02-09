import type { User } from './user.type'

export const USERS: User[] = [
  createUser('John Doe'),
  createUser('Jane Doe'),
  createUser('Robert Smith'),
  createUser('Emily Johnson'),
  createUser('Michael Brown'),
  createUser('Sarah Wilson'),
  createUser('Daniel Davis'),
  createUser('Olivia Martinez'),
  createUser('James Anderson'),
  createUser('Emma Taylor'),
  createUser('William Thomas'),
  createUser('Sophia Jackson'),
  createUser('Benjamin Clark'),
  createUser('Ava Lewis'),
  createUser('Alexander Walker'),
  createUser('Isabella Hall'),
  createUser('Ethan Young'),
  createUser('Mia Adams'),
  createUser('Liam Scott')
]

function createUser(name: string) {
  return {
    id: crypto.randomUUID(),
    name
  }
}
