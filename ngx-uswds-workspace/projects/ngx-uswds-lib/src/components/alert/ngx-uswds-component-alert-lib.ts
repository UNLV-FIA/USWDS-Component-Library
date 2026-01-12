import { Component, input, computed } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';

type AlertType = 'Informative' | 'Warning' | 'Success' | 'Error' | 'Emergency'

@Component({
  selector: 'lib-ngx-uswds-component-alert-lib',
  imports: [NgClass],
  templateUrl: './ngx-uswds-component-alert-lib.html',
  styleUrl: './ngx-uswds-component-alert-lib.css',
})
export class UswdsAlert {
  type = input.required<AlertType>();
  headerText = input('');
  text = input(''); 

  // Computed Variables to help with css later
  alertType = computed(() => {
    const val = this.type(); 
    if (!val) throw new Error('Alert type is required')
    return val; 
  })

  alertClass = computed(() => ({
    'usa-alert--info': this.alertType() === 'Informative', 
    'usa-alert--warning': this.alertType() == 'Warning',
    'usa-alert--success': this.alertType() == 'Success',
    'usa-alert--error': this.alertType() == 'Error',
    'usa-alert--emergency': this.alertType() == 'Emergency'
  }))
 

}
