import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-uswds-button',
  imports: [],
  templateUrl: './uswds-button.html',
  styleUrl: './uswds-button.css',
})
export class UswdsButton {
  @Input() text: string = "EMPTY";
}
