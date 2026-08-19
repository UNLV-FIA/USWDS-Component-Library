import { Component } from '@angular/core';

/**
 * @class UswdsProcessListItem
 * @description
 * A child component of `<ngx-uswds-process-list>` that renders an individual process step.
 *
 * The `name` attribute and visual variant are inherited from the parent checkbox component.
 *
 * @selector ngx-uswds-process-list-item
 *
 * @example
 * <ngx-uswds-process-list-item>
 * </ngx-uswds-process-list-item>
 *
 * @input {type} varName - Description
 */
@Component({
  selector: 'ngx-uswds-process-list-item',
  imports: [],
  templateUrl: './uswds-process-list-item.html',
  styleUrl: './uswds-process-list-item.scss',
})
export class UswdsProcessListItem {}
