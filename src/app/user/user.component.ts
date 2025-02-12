import { Component, computed, input } from '@angular/core'
import { TableComponent, TableStateController } from '../components'
import { numberTransformer, stringTransformer } from '../transformers'
import { User } from './user.type'
import { Result } from '../util'
import { CardModule } from 'primeng/card'

@Component({
  selector: 'tsm-user',
  imports: [TableComponent, CardModule],
  templateUrl: './user.component.html'
})
export class UserComponent {
  result = input.required<Result<User>>()
  page = input(1, { transform: numberTransformer(1) })
  limit = input(10, { transform: numberTransformer(10) })
  search = input('', { transform: stringTransformer() })
  controller = input<TableStateController>()

  users = computed(() => this.result().items)
  count = computed(() => this.result().count)

  trackBy(item: User) {
    return item.id
  }
}
