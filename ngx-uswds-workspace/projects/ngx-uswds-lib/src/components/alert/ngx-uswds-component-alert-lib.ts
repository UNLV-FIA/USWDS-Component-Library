import { Component, input, computed, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { AlertType } from './alert.types';

@Component({
  selector: 'lib-ngx-uswds-component-alert-lib',
  imports: [NgClass],
  templateUrl: './ngx-uswds-component-alert-lib.html',
  styleUrl: './ngx-uswds-component-alert-lib.css',
})
export class UswdsAlert {
  type = input.required<AlertType>();
  slimAlert = input<Boolean>(false);
  setNoIcon = input<Boolean>(false);
  headerText = input.required<string>();
  text = input('');

  // Computed Variables to help with css later
  alertType = computed(() => {
    const val = this.type();
    if (!val) throw new Error('Alert type is required');
    return val;
  });

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
        throw Error('Provided Type does exist, valid options: [Informative, Warning, Success, Error, Emergency]');
    }
  }
}
