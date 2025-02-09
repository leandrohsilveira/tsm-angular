import { NgTemplateOutlet } from '@angular/common'
import { Component, computed, input, TemplateRef } from '@angular/core'
import { SvgIconComponent } from 'angular-svg-icon'

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
}
