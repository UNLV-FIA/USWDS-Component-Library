import { Component, input, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItem, AccordionVariant } from './accordion-item';

@Component({
  selector: 'uswds-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-uswds-component-accordion-lib.html',
  styleUrls: []
})
export class AccordionComponent implements OnInit {
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
    AccordionComponent.instanceCounter++;
    return `accordion-${AccordionComponent.instanceCounter}`;
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
