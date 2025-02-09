import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { provideAngularSvgIcon } from 'angular-svg-icon'
import { routes } from './app.routes'
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideAngularSvgIcon()
  ]
}
