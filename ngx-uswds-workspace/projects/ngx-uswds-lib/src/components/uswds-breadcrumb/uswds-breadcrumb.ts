import { Component, computed, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type BreadcrumbVariant = 'default' | 'wrap';

/**
 * @class UswdsBreadcrumb
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) breadcrumb.
 * Breadcrumbs provide secondary navigation that helps users understand where they are
 * in a website's hierarchy and navigate back to parent pages.
 *
 * The last item in the `items` array is always treated as the current page and is
 * rendered as non-linked text with `aria-current="page"`. All preceding items are
 * rendered as links.
 *
 * Supports an optional RDFa variant that adds `schema.org/BreadcrumbList` structured
 * data attributes for improved SEO and linked-data compatibility.
 *
 * @selector ngx-uswds-breadcrumb
 *
 * @example
 * <ngx-uswds-breadcrumb
 *   [items]="[{ label: 'Home', href: '/' }, { label: 'Section', href: '/section' }, { label: 'Current page' }]"
 * ></ngx-uswds-breadcrumb>
 *
 * @example
 * <!-- Wrapping variant with RDFa structured data -->
 * <ngx-uswds-breadcrumb [items]="breadcrumbs" variant="wrap" [rdfa]="true"></ngx-uswds-breadcrumb>
 *
 * @input {BreadcrumbItem[]} [items=[]] - The ordered list of breadcrumb items to display.
 *   Each item requires a `label` and accepts an optional `href`. The last item is
 *   rendered as the current page (non-linked).
 *
 * @input {BreadcrumbVariant} [variant='default'] - The layout variant for the breadcrumb list.
 *   Accepts 'default' for single-line display (may truncate on small screens) or
 *   'wrap' to allow items to wrap onto multiple lines.
 *
 * @input {boolean} [rdfa=false] - When true, renders the breadcrumb with RDFa structured
 *   data attributes (`schema.org/BreadcrumbList`).
 */
@Component({
  selector: 'ngx-uswds-breadcrumb',
  standalone: true,
  imports: [NgClass],
  templateUrl: './uswds-breadcrumb.html',
  styleUrls: ['./uswds-breadcrumb.scss'],
})
export class UswdsBreadcrumb {
  private sanitizer = inject(DomSanitizer);

  // v8 ignore next
  items = input<BreadcrumbItem[]>([]);
  // v8 ignore next
  variant = input<BreadcrumbVariant>('default');
  // v8 ignore next
  rdfa = input<boolean>(false);

  safeHref(href: string | undefined): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(href ?? 'javascript:void(0);');
  }

  // v8 ignore next
  containerClasses = computed(() => this.containerClassesFn());
  containerClassesFn = () => {
    const classes = ['usa-breadcrumb'];
    if (this.variant() === 'wrap') {
      classes.push('usa-breadcrumb--wrap');
    }
    return classes;
  };

  // v8 ignore next
  leadingItems = computed(() => this.leadingItemsFn());
  leadingItemsFn = () => this.items().slice(0, -1);

  // v8 ignore next
  currentItem = computed(() => this.currentItemFn());
  currentItemFn = () => (this.items().length > 0 ? this.items()[this.items().length - 1] : null);
}
