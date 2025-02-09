import { ParamMap } from '@angular/router'
import { createPageableFromQueryParamMap } from './pageable'
import { assert } from './assert'
import { Result } from './result'

export function searchAndPaginate<T>(
  queryParams: ParamMap | URLSearchParams,
  items: T[],
  searchField: keyof T | ((item: T) => string)
): Result<T> {
  const { start, end, search } = createPageableFromQueryParamMap(queryParams)

  const getSearchValue =
    typeof searchField === 'function'
      ? searchField
      : createSearchFieldGetter(searchField)

  const filtered = items.filter(filter)
  return {
    items: [...filtered].slice(start, end),
    count: filtered.length
  }

  function filter(item: T) {
    return getSearchValue(item).toLowerCase().indexOf(search.toLowerCase()) >= 0
  }
}

function createSearchFieldGetter<T>(key: keyof T) {
  return (item: T) => {
    const value = item[key]
    assert(
      typeof value === 'string',
      `Search field ${String(key)} is not a string`
    )
    return value
  }
}
