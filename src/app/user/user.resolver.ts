import type { ResolveFn } from '@angular/router'
import { User } from './user.type'

export const userResolver: ResolveFn<User[]> = async () => {
  return new Promise(resolve => {
    setTimeout(
      () => resolve([{ id: crypto.randomUUID(), name: 'Leandro' }]),
      200
    )
  })
}
