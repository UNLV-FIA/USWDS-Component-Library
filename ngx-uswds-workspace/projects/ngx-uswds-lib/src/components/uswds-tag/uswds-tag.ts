import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TagVariant } from './tag-types';

/***
 * @class UswdsTag
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) tag.
 * Tags help draws users' attention to new content, filter results, or show the number of new or unread items for a container.
 * They support a big visual variant.
 *
 * @selector ngx-uswds-tag
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
  selector: 'ngx-uswds-tag',
  imports: [NgClass],
  templateUrl: './uswds-tag.html',
  styleUrl: './uswds-tag.scss',
})
export class UswdsTag {
  // v8 ignore next
  variant = input<TagVariant>('default');

  // Tag variant selection function
  tagVariantCSS(): string {
    switch (this.variant()) {
      case 'default':
        return '';
      case 'big':
        return 'usa-tag--big';
      default:
        throw new Error('Invalid variant selected, valid variants are: [default, big]');
    }
  }
}
