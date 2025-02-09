import { Routes } from '@angular/router'
import { UserComponent } from './user.component'
import { userResolver } from './user.resolver'

const userRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserComponent,
    resolve: {
      result: userResolver
    }
  }
]

export default userRoutes
