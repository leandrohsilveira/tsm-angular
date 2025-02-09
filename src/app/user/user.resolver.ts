import type { ResolveFn } from '@angular/router'
import { randomDelay, Result, searchAndPaginate } from '../util'
import type { User } from './user.type'
import { USERS } from './user.data'

export const userResolver: ResolveFn<Result<User>> = async ({
  queryParamMap
}) => {
  await randomDelay(200, 1500)
  return searchAndPaginate(queryParamMap, USERS, 'name')
}
