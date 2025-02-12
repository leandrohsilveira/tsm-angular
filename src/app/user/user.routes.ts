import { Routes } from '@angular/router'
import { UserComponent } from './user.component'
import { userResolver } from './user.resolver'
import { TableStateRouteControllerResolver } from '../components'

const userRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserComponent,
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
    resolve: {
      result: userResolver,
      controller: TableStateRouteControllerResolver
    }
  }
]

export default userRoutes
