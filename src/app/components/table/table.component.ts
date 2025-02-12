import { NgTemplateOutlet } from '@angular/common'
import {
  Component,
  computed,
  contentChild,
  ElementRef,
  input,
  model,
  output,
  TemplateRef,
  viewChild
} from '@angular/core'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { PaginatorModule, PaginatorState } from 'primeng/paginator'
import { TableModule } from 'primeng/table'
import { numberTransformer } from '../../transformers'
import { assert } from '../../util'
import { DisplayTextTemplates, TableState } from './table.type'

export const DEFAULT_DISPLAY_TEXT_TEMPLATES = {
  empty: '',
  one: 'Showing the only one item',
  many: 'Showing {first} - {last} of {totalRecords} items'
}

@Component({
  selector: 'tsm-table',
  imports: [
    NgTemplateOutlet,
    TableModule,
    InputTextModule,
    FloatLabelModule,
    PaginatorModule
  ],
  templateUrl: './table.component.html'
})
export class TableComponent<T> {
  items = input.required<T[]>()
  track = input.required<((item: T) => string) | keyof T>()
  page = model(1)
  limit = model(10)
  search = model('')
  loading = input(false)
  count = input(0, { transform: numberTransformer() })
  displayTextTemplates = input<Partial<DisplayTextTemplates>>(
    DEFAULT_DISPLAY_TEXT_TEMPLATES
  )

  stateChange = output<TableState>()

  trackBy = computed(() => {
    const track = this.track()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof track === 'function' ? (track as any) : undefined
  })
  dataKey = computed(() => {
    const track = this.track()
    return typeof track === 'string' ? String(track) : undefined
  })
  displayTextTemplate = computed(() => {
    const templates = this.displayTextTemplates()
    if (this.count() === 0)
      return templates.empty ?? DEFAULT_DISPLAY_TEXT_TEMPLATES.empty
    else if (this.count() === 1)
      return templates.one ?? DEFAULT_DISPLAY_TEXT_TEMPLATES.one
    return templates.many ?? DEFAULT_DISPLAY_TEXT_TEMPLATES.many
  })

  first = computed(() => Math.max(this.page() * this.limit() - this.limit(), 0))

  pageRef = viewChild.required<ElementRef<HTMLInputElement>>('pageRef')
  limitRef = viewChild.required<ElementRef<HTMLInputElement>>('limitRef')

  bodyRef = contentChild.required<TemplateRef<unknown>>('body')

  handlePageChange({ first, rows }: PaginatorState) {
    first ??= this.first()
    rows ??= this.limit()
    this.page.set(Math.max(0, Math.floor((first + rows) / rows)))
    this.limit.set(rows)
    this.dispatchStateChange()
  }

  handleSearch(event: Event) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const search = formData.get('search')
    assert(
      typeof search === 'string',
      'TableComponent search input value should be a string'
    )
    this.search.set(search)
    this.dispatchStateChange()
  }

  private dispatchStateChange() {
    this.stateChange.emit({
      limit: this.limit(),
      page: this.page(),
      search: this.search()
    })
  }
}
