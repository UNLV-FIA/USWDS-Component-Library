import { Component, input, computed, signal, OnInit, AfterContentInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { IconSize } from './icon-types';

/**
 * @class UswdsIcon
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) icon.
 * Icons are simple symbols that help communicate meaning, actions, status or feedback.
 * They should be combined with text to improve clarity or be within another interactive component.
 *
 * Note: Change the icon's color by applying one of the USWDS text color classes on its direct parent.
 * The title's ID is auto-generated to avoid ID collisions between multiple descriptive icons on the same page.
 *
 * @selector ngx-uswds-icon
 *
 * @example
 * <!-- Using a decorative icon -->
 * <a href="/uswds">
 *  <ngx-uswds-icon name="twitter" [size]="3"></ngx-uswds-icon>
 *  USWDS' Twitter account
 * </a>
 *
 * @example
 * <!-- Using a descriptive icon -->
 * <a href="/uswds">
 *  <ngx-uswds-icon name="twitter" title="USWDS' Twitter account"></ngx-uswds-icon>
 * </a>
 *
 * @input {string} name - Sets the visual icon. Refer to USWDS's list of icons to help choose an icon. Required.
 *
 * @input {IconSize} size - The size of the icon in n x n units. Accepts 3-9. Optional.
 *
 * @input {string} title - The descriptive text rendered in the icon's <title>. Should be provided when the icon has
 *   no accompanying text to make the icon perceivable to screen readers. Optional.
 *
 * @input {string} [assetsPath='/assets/img'] - Base path to the icon image assets.
 *   Useful when assets are hosted in a different location. Optional.
 */
@Component({
  selector: 'ngx-uswds-icon',
  imports: [NgClass],
  templateUrl: './uswds-icon.html',
  styleUrl: './uswds-icon.scss',
})
export class UswdsIcon implements OnInit, AfterContentInit {
  // v8 ignore next
  name = input.required<string>();
  // v8 ignore next
  size = input<IconSize>();
  // v8 ignore next
  title = input<string>();
  // v8 ignore next
  assetsPath = input<string>('/assets/img');
  // v8 ignore next
  titleId = signal<string>('');

  private static instanceCounter = 0;

  ngOnInit(): void {
    if (this.title() === '') {
      throw new Error('Property "title" cannot be an empty string');
    }
  }

  ngAfterContentInit(): void {
    this.titleId.set(this.generateUniqueTitleId());
  }

  private generateUniqueTitleId(): string {
    UswdsIcon.instanceCounter++;
    return `${this.name()}-${UswdsIcon.instanceCounter}-title`;
  }

  // v8 ignore next
  computedTitleId = computed(() => this.titleId());

  // v8 ignore next
  ariaHidden = computed(() => this.ariaHiddenFn());
  ariaHiddenFn = () => {
    const title = this.title();
    if (title) return null;
    return true;
  };

  // v8 ignore next
  focusable = computed(() => this.focusableFn());
  focusableFn = () => {
    const title = this.title();
    if (title) return null;
    return false;
  };

  // v8 ignore next
  ariaLabelledBy = computed(() => this.ariaLabelledByFn());
  ariaLabelledByFn = () => {
    const title = this.title();
    if (title) return this.titleId();
    return null;
  };

  // Icon size selection function
  // v8 ignore next
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

  // v8 ignore next
  iconPath = computed(() => `${this.assetsPath()}/sprite.svg#${this.name()}`);
}
