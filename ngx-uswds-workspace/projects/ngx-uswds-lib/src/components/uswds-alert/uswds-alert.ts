import { Component, input, computed, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { AlertType } from './alert.types';

@Component({
  selector: 'ngx-uswds-alert',
  imports: [NgClass],
  templateUrl: './uswds-alert.html',
  styleUrl: './uswds-alert.scss',
})

/***
 * @class
 * @description
 * An angular component that renders a customizable alert keeping users informed of imporatnd and sometimes time-sensitive changes.
 * @selector ngx-uswds-alert
 */
export class UswdsAlert implements OnInit {
  /**
   * Chooses which version of the uswds alert to display.
   * Possible Values
   * - `Informative`
   * - `Warning`
   * - `Success`
   * - `Error`
   * - `Emergency`
   */
  // c8 ignore next
  type = input.required<AlertType>();
  /**
   * Chooses whether to display the slim version of the alert
   * @default false
   *
   */
  // c8 ignore next
  slimAlert = input<boolean>(false);
  /**
   * Choose whether to display an icon or not
   * @default false
   *
   */
  // c8 ignore next
  setNoIcon = input<boolean>(false);
  /**
   * Sets the header of the alert
   *
   */
  // c8 ignore next
  headerText = input.required<string>();

  ngOnInit(): void {
    if (!this.headerText() || this.headerText().trim() == '')
      throw new Error("Propery 'headerText' is required and cannot be an empty string");
  }

  // Computed Variables to help with css later
  // c8 ignore next
  alertType = computed(() => this.alertTypeFn());
  alertTypeFn = () => {
    const val = this.type();
    if (!val) throw new Error('Alert type is required');
    return val;
  };

  alertClassReturn(): string {
    switch (this.alertType()) {
      case 'Informative':
        return 'usa-alert--info';
      case 'Warning':
        return 'usa-alert--warning';
      case 'Success':
        return 'usa-alert--success';
      case 'Error':
        return 'usa-alert--error';
      case 'Emergency':
        return 'usa-alert--emergency';
      default:
        throw new Error(
          'Provided Type does exist, valid options: [Informative, Warning, Success, Error, Emergency]',
        );
    }
  }
}
