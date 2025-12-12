import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UswdsButton } from 'ngx-uswds-lib';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UswdsButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ngx-uswds-demo');
}
