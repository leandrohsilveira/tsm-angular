import { Routes } from '@angular/router'
import { HomeComponent } from './home'

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'users',
    loadChildren() {
      return import('./user/user.routes')
    }
  }
]
