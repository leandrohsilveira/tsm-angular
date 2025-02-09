import { ParamMap } from '@angular/router'

interface Pageable {
  page: number
  limit: number
  search: string
  start: number
  end: number
}

export function createPageable(
  page: number | null,
  limit: number | null,
  search: string | null
): Pageable {
  page ??= 1
  limit ??= 10
  search ??= ''
  const start = (page - 1) * limit
  const end = start + limit
  return {
    page,
    limit,
    search,
    start,
    end
  }
}

export function createPageableFromQueryParamMap(
  queryParamMap: URLSearchParams | ParamMap
) {
  return createPageable(
    toNumber(queryParamMap.get('page')),
    toNumber(queryParamMap.get('limit')),
    queryParamMap.get('search')
  )
}

function toNumber(value: string): number | null
function toNumber(value: string | null): number | null
function toNumber(value: string | undefined): number | undefined
function toNumber(value: string | null | undefined) {
  if (value === null || value === undefined) {
    return value
  }
  if (value === '') return null
  return Number(value)
}
