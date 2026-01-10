import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { UswdsButton, USWDSCard, BannerComponent } from 'ngx-uswds-lib'; // example, can remove

@Component({
  selector: 'app-root',
  imports: [ BannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ngx-uswds-demo');
}
