import { NgTemplateOutlet } from '@angular/common'
import { Component, computed, input, TemplateRef } from '@angular/core'
import { SvgIconComponent } from 'angular-svg-icon'
import { formatText } from '../../util'

interface DisplayTextTemplates {
  empty: string
  one: string
  many: string
}

export const DEFAULT_DISPLAY_TEXT_TEMPLATES = {
  empty: '',
  one: 'Showing the only one item',
  many: 'Showing {start} - {end} of {count} items'
}

@Component({
  selector: 'tsm-table',
  imports: [NgTemplateOutlet, SvgIconComponent],
  templateUrl: './table.component.html'
})
export class TableComponent<T> {
  items = input.required<T[]>()
  track = input.required<(item: T) => string>()
  search = input('')
  count = input(0)
  page = input(1)
  limit = input(10)
  displayTextTemplate = input<Partial<DisplayTextTemplates>>(
    DEFAULT_DISPLAY_TEXT_TEMPLATES
  )

  pages = computed(() => Math.ceil(this.count() / this.limit()))
  offsetLeft = computed(() => Math.min(Math.max(this.page() - 1, 0), 2))
  offsetRight = computed(() =>
    Math.min(Math.max(this.pages() - this.page(), 0), 2)
  )
  firstPage = computed(() =>
    Math.max(this.page() - (this.offsetLeft() + (2 - this.offsetRight())), 1)
  )
  lastPage = computed(() =>
    Math.min(
      this.page() + (this.offsetRight() + (3 - (this.offsetLeft() + 1))),
      this.pages()
    )
  )
  pageList = computed(() =>
    Array.from({
      length: Math.max(this.lastPage() - this.firstPage() + 1, 1)
    }).map((_, index) => this.firstPage() + index)
  )
  start = computed(() => Math.max(this.page() - 1, 0) * this.limit())
  end = computed(() => Math.min(this.start() + this.limit(), this.count()))
  currentPage = computed(() => this.page())

  itemRef = input.required<TemplateRef<unknown>>()
  displayText = computed(() => {
    const templates = this.displayTextTemplate()
    let template = templates.many ?? DEFAULT_DISPLAY_TEXT_TEMPLATES.many
    if (this.count() === 0)
      template = templates.empty ?? DEFAULT_DISPLAY_TEXT_TEMPLATES.empty
    else if (this.count() === 1)
      template = templates.one ?? DEFAULT_DISPLAY_TEXT_TEMPLATES.one
    return formatText(template, {
      start: this.start() + 1,
      end: this.end(),
      count: this.count()
    })
  })
}
