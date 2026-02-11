import { Component, input, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItem, AccordionVariant } from './accordion-types';

/**
 * @class AccordionComponent
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) accordion.
 * Accordions allow users to show and hide sections of related content on a page.
 * They support both single-select and multiselectable modes, as well as bordered
 * and borderless visual options/variants.
 *
 * @selector ngx-uswds-accordion
 *
 * @example
 * // Bordered, multiselectable accordion
 * <uswds-accordion
 *   variant="bordered"
 *   [multiselectable]="true"
 *   [items]="[
 *     { heading: 'Section 1', content: '<p>Content 1</p>', expandedByDefault: true },
 *     { heading: 'Section 2', content: '<p>Content 2</p>' }
 *   ]">
 * </uswds-accordion>
 *
 * @input {AccordionItem[]} [items=[]] - Array of accordion items to render. Each item
 *   includes a heading, HTML content, and an optional expandedByDefault flag.
 *
 * @input {AccordionVariant} [variant='borderless'] - The visual option of the accordion.
 *   Accepts 'borderless' for the default style or 'bordered' for a bordered style.
 *
 * @input {boolean} [multiselectable=false] - Whether multiple panels can be open at once.
 *   When false, opening a panel closes any other open panel.
 *
 * @input {string} [idPrefix] - Custom prefix for generated element IDs. If not provided,
 *   a unique prefix is auto-generated to avoid ID collisions between multiple accordions.
 */
@Component({
  selector: 'ngx-uswds-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uswds-accordion.html',
  styleUrls: ['./uswds-accordion.scss'],
})
export class UswdsAccordion implements OnInit {
  items = input<AccordionItem[]>([]);
  variant = input<AccordionVariant>('borderless');
  multiselectable = input<boolean>(false);
  idPrefix = input<string>();

  expandedIndices = signal<Set<number>>(new Set());
  resolvedIdPrefix = signal<string>('');

  private static instanceCounter = 0;

  ngOnInit(): void {
    this.resolvedIdPrefix.set(this.idPrefix() ?? this.generateUniquePrefix());
    this.applyDefaults();
  }

  contentId(index: number): string {
    return `${this.resolvedIdPrefix()}-${index + 1}`;
  }

  buttonId(index: number): string {
    return `${this.resolvedIdPrefix()}-btn-${index + 1}`;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndices().has(index);
  }

  togglePanel(index: number): void {
    if (this.multiselectable()) {
      this.toggleMultiselect(index);
    } else {
      this.toggleSingleSelect(index);
    }
  }

  containerClasses = computed(() => {
    const classes = ['usa-accordion'];

    if (this.variant() === 'bordered') {
      classes.push('usa-accordion--bordered');
    }

    if (this.multiselectable()) {
      classes.push('usa-accordion--multiselectable');
    }
    return classes;
  });

  private generateUniquePrefix(): string {
    UswdsAccordion.instanceCounter++;
    return `accordion-${UswdsAccordion.instanceCounter}`;
  }

  private applyDefaults(): void {
    const newSet = new Set<number>();
    const currentItems = this.items();

    for (let i = 0; i < currentItems.length; i++) {
      if (currentItems[i].expandedByDefault) {
        newSet.add(i);

        if (!this.multiselectable()) {
          break;
        }
      }
    }
    this.expandedIndices.set(newSet);
  }

  private toggleSingleSelect(index: number): void {
    const current = this.expandedIndices();
    if (current.has(index)) {
      this.expandedIndices.set(new Set());
    } else {
      this.expandedIndices.set(new Set([index]));
    }
  }

  private toggleMultiselect(index: number): void {
    const current = new Set(this.expandedIndices());
    if (current.has(index)) {
      current.delete(index);
    } else {
      current.add(index);
    }
    this.expandedIndices.set(current);
  }
}
