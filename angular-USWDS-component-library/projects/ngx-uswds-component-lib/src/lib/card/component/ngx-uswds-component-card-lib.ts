import { Component, Input} from '@angular/core';

@Component({
  selector: 'lib-ngx-USWDS-component-card',
  templateUrl: './ngx-uswds-component-card-lib.html',
})
export class NgxUSWDSCardComponentLib {
  @Input() isCardFlagType?:boolean;
  @Input() isInCardGroup?:boolean;
  @Input() setFlagOrientationRight?:boolean;
}
