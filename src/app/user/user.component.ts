import { Component, input } from '@angular/core'
import { TableComponent } from '../components'
import { User } from './user.type'

@Component({
  selector: 'tsm-user',
  imports: [TableComponent],
  templateUrl: './user.component.html'
})
export class UserComponent {
  users = input<User[]>([])
  page = input(1, { transform: Number })
  limit = input(10, { transform: Number })
  search = input('')

  trackBy(item: User) {
    return item.id
  }
}
