import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { USWDSCard } from 'ngx-uswds-components';

@Component({
  selector: 'app-root',
  imports: [USWDSCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('uswds-component-demo');
}
