import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-uswds-button',
  imports: [],
  templateUrl: './ngx-uswds-component-button-lib.html',
  styleUrl: './ngx-uswds-component-button-lib.css',
})
export class UswdsButton {
  @Input() text: string = "EMPTY";
}
