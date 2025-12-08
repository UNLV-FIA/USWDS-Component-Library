import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'lib-ngx-USWDS-component-card',
  standalone: true,
  templateUrl: './ngx-uswds-component-card-lib.html',
  styleUrl: '../../../sass/styles.scss',
  imports: [CommonModule]
})
export class NgxUSWDSCardComponentLib {
  @Input() isCardFlagType?:boolean;
  @Input() isInCardGroup?:boolean;
  @Input() setFlagOrientationRight?:boolean;
}
