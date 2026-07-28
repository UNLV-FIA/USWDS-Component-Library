import { Component } from '@angular/core';

/**
 * @class UswdsIcon
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) icon.
 * Icons...
 *
 * @selector ngx-uswds-icon
 *
 * @example
 * <!-- Using the default tag -->
 * <ngx-uswds-tag>INFO</ngx-uswds-tag>
 * <ngx-uswds-tag variant='default'>INFO</ngx-uswds-tag>
 *
 * @example
 * <!-- Using the big tag -->
 * <ngx-uswds-tag variant='big'>BIG</ngx-uswds-tag>
 *
 * @input {TagVariant} [variant='default'] - Sets the variant style of the tag.
 *    It's 'default' variant automatically. 'big' sets the tag to big variant.
 */
@Component({
  selector: 'ngx-uswds-icon',
  imports: [],
  templateUrl: './uswds-icon.html',
  styleUrl: './uswds-icon.scss',
})
export class UswdsIcon {}
