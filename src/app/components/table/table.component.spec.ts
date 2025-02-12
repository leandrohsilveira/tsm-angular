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
    expect(component.displayTextTemplates()).toEqual(
      DEFAULT_DISPLAY_TEXT_TEMPLATES
    )
  })
})
