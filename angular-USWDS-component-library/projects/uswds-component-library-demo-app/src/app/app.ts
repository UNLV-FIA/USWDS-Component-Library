import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxUSWDSCardComponentLib} from 'ngx-USWDS-component-lib';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxUSWDSCardComponentLib],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('uswds-component-library-demo-app');
}
