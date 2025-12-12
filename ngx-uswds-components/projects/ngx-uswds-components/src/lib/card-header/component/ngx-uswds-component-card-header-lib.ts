import { Component, Input} from '@angular/core';
import { cardHeaderLevelOptions } from '../types/ngx-uswds-type-card-header';

@Component({
  selector: 'uswds-card-header',
  templateUrl: './ngx-uswds-component-card-header-lib.html',
})
export class USWDSCardHeader {
  @Input() CardHeaderLevel:cardHeaderLevelOptions = "H4";
  @Input() CardHeaderContent:string = "default title";
}
