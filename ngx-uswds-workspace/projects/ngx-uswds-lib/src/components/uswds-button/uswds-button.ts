import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-uswds-button',
  imports: [],
  templateUrl: './uswds-button.html',
  styleUrl: './uswds-button.scss',
})
export class UswdsButton {
  @Input() text: string = "EMPTY";
}
