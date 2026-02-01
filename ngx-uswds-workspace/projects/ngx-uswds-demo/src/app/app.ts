import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccordionComponent } from 'ngx-uswds-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccordionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}