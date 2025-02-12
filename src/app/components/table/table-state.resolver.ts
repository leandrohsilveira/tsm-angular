import { Injectable, signal, Signal } from '@angular/core'
import {
  type ActivatedRouteSnapshot,
  type Resolve,
  Router
} from '@angular/router'
import { TableState } from './table.type'

export interface TableStateController {
  loading: Signal<boolean>
  onChange(state: TableState): Promise<boolean>
}

@Injectable({ providedIn: 'root' })
export class TableStateRouteControllerResolver
  implements Resolve<TableStateController>
{
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): TableStateController {
    const loading = signal(false)
    return {
      loading,
      onChange: async ({ page, limit, search }) => {
        loading.set(true)
        try {
          return await this.router.navigate([], {
            queryParams: Object.fromEntries(
              Object.entries({
                ...route.queryParams,
                page,
                limit,
                search
              })
                .filter(([, value]) => value !== '')
                .map(([key, value]) => [key, String(value)])
            )
          })
        } finally {
          loading.set(false)
        }
      }
    }
  }
}
