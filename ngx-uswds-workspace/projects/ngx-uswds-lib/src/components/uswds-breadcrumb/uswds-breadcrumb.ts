import { Component, inject, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type BreadcrumbVariant = 'default' | 'wrap';

@Component({
  selector: 'uswds-breadcrumb',
  standalone: true,
  imports: [NgClass],
  templateUrl: './uswds-breadcrumb.html',
  styleUrls: ['./uswds-breadcrumb.scss'],
})
export class UswdsBreadcrumb {
  private sanitizer = inject(DomSanitizer);

  @Input() items: BreadcrumbItem[] = [];
  @Input() variant: BreadcrumbVariant = 'default';
  @Input() rdfa: boolean = false;

  safeHref(href: string | undefined): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(href ?? 'javascript:void(0);');
  }

  get containerClasses(): string[] {
    const classes = ['usa-breadcrumb'];
    if (this.variant === 'wrap') {
      classes.push('usa-breadcrumb--wrap');
    }
    return classes;
  }

  get leadingItems(): BreadcrumbItem[] {
    return this.items.slice(0, -1);
  }

  get currentItem(): BreadcrumbItem | null {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }
}
