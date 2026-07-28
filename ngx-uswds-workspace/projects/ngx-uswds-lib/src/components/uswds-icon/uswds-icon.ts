import { Component, input, computed, AfterContentInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { IconSize } from './icon-types';

/**
 * @class UswdsIcon
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) icon.
 * Icons...
 *
 * @selector ngx-uswds-icon
 *
 * @example
 * <!-- Using an icon -->
 *
 * @example
 * <!-- Using an accessible icon -->
 *
 * @input {string} name - Sets the variant style of the tag.
 *    It's 'default' variant automatically. 'big' sets the tag to big variant.
 *
 * @input {string} size - Sets the variant style of the tag.
 *    It's 'default' variant automatically. 'big' sets the tag to big variant.
 */
@Component({
  selector: 'ngx-uswds-icon',
  imports: [NgClass],
  templateUrl: './uswds-icon.html',
  styleUrl: './uswds-icon.scss',
})
export class UswdsIcon implements AfterContentInit {
  name = input.required<string>();
  size = input<IconSize>();
  title = input<string>();
  assetsPath = input<string>('/assets/img');

  private static instanceCounter = 0;
  private titleId = '';

  ngAfterContentInit(): void {
    this.titleId = this.generateUniqueTitleId();
  }

  private generateUniqueTitleId(): string {
    UswdsIcon.instanceCounter++;
    return `${this.name()}-${UswdsIcon.instanceCounter}-title`;
  }

  computedTitleId = computed(() => this.computedTitleIdFn());
  computedTitleIdFn = () => {
    const title = this.title();
    if (title) return this.titleId;
    return null;
  };

  ariaHidden = computed(() => this.ariaHiddenFn());
  ariaHiddenFn = () => {
    const title = this.title();
    if (title) return null;
    return true;
  };

  focusable = computed(() => this.focusableFn());
  focusableFn = () => {
    const title = this.title();
    if (title) return null;
    return false;
  };

  ariaLabelledBy = computed(() => this.ariaLabelledByFn());
  ariaLabelledByFn = () => {
    const title = this.title();
    if (title) return this.titleId;
    return null;
  };

  // Icon size selection function
  iconSizeCss = computed(() => this.iconSizeCssFn());
  iconSizeCssFn = () => {
    switch (this.size()) {
      case undefined:
        return '';
      case 3:
        return 'usa-icon--size-3';
      case 4:
        return 'usa-icon--size-4';
      case 5:
        return 'usa-icon--size-5';
      case 6:
        return 'usa-icon--size-6';
      case 7:
        return 'usa-icon--size-7';
      case 8:
        return 'usa-icon--size-8';
      case 9:
        return 'usa-icon--size-9';
      default:
        throw new Error('Invalid size selected, valid options are 3-9');
    }
  };

  iconPath = computed(() => `${this.assetsPath()}/sprite.svg#${this.name()}`);
}
