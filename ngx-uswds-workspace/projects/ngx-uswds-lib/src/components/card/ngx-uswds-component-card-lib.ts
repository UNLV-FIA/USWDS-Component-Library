import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'uswds-card',
  standalone: true,
  templateUrl: './ngx-uswds-component-card-lib.html',
  imports: [CommonModule]
})
export class USWDSCard {
  @Input() isCardFlagType?:boolean;
  @Input() isInCardGroup?:boolean;
  @Input() setFlagOrientationRight?:boolean;
  @Input() customClasses: string | string[] | Set<string> | { [key: string]: any } | null | undefined;
  @Input() customStyles: { [key: string]: any } | null | undefined;
}
