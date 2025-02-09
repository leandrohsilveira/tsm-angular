import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LayoutComponent } from './layout'

@Component({
  selector: 'tsm-root',
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tsm-angular'
}
