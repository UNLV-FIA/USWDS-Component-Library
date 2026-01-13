import { Component, input, computed } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';

type AlertType = 'Informative' | 'Warning' | 'Success' | 'Error' | 'Emergency'
const assetsPath = '/assets/img'
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

  iconHref = computed(() => {
    switch (this.type()) {
      case 'Informative':
        return `${assetsPath}/info.svg`
      case 'Warning':
        return `${assetsPath}/warning.svg`
      case 'Success':
        return `${assetsPath}/check_circle.svg`
      case 'Error':
        return `${assetsPath}/error.svg`
      case 'Emergency':
        return `${assetsPath}/error_outline.svg`
      default:
         return `${assetsPath}/info.svg`
    }
  })
 

}
