import { provideHttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { provideAngularSvgIcon } from 'angular-svg-icon'
import {
  DEFAULT_DISPLAY_TEXT_TEMPLATES,
  TableComponent
} from './table.component'

describe('TableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideAngularSvgIcon(), provideHttpClient()],
      imports: [TableComponent]
    }).compileComponents()
  })

  it('should instantiate the component', async () => {
    const fixture = TestBed.createComponent(TableComponent)

    fixture.componentRef.setInput('items', [])
    fixture.componentRef.setInput('track', () => '')
    fixture.autoDetectChanges()
    await fixture.whenStable()

    const component = fixture.componentInstance

    expect(component).toBeTruthy()
    expect(component.search()).toBe('')
    expect(component.count()).toBe(0)
    expect(component.page()).toBe(1)
    expect(component.limit()).toBe(10)
    expect(component.displayTextTemplate()).toEqual(
      DEFAULT_DISPLAY_TEXT_TEMPLATES
    )
    expect(component.pages()).toBe(0)
    expect(component.offsetLeft()).toBe(0)
    expect(component.offsetRight()).toBe(0)
    expect(component.firstPage()).toBe(1)
    expect(component.lastPage()).toBe(0)
    expect(component.pageList()).toEqual([1])
    expect(component.start()).toBe(0)
    expect(component.end()).toBe(0)
    expect(component.currentPage()).toBe(1)
  })
})
