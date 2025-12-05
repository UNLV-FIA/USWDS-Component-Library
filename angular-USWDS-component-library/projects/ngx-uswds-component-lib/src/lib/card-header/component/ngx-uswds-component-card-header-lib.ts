import { Component, Input} from '@angular/core';
import { cardHeaderLevelOptions } from '../types/ngx-uswds-type-card-header';

@Component({
  selector: 'lib-ngx-USWDS-component-card-header',
  templateUrl: './ngx-uswds-component-card-header-lib.html',
})
export class NgxUSWDSCardHeaderComponentLib {
  @Input() CardHeaderLevel:cardHeaderLevelOptions = "H4";
  @Input() CardHeaderContent:string = "default title";
}
