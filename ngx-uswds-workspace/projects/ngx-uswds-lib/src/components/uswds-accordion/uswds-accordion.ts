import {
  Component,
  input,
  signal,
  computed,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { UswdsAccordionItem } from './uswds-accordion-item';
import { AccordionVariant, HeadingLevel } from './accordion-types';

/**
 * @class UswdsAccordion
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) accordion.
 * Accordions allow users to show and hide sections of related content on a page.
 * They support both single-select and multiselectable modes, as well as bordered
 * and borderless visual variants.
 *
 * Uses a compound component pattern: place one or more `<ngx-uswds-accordion-item>`
 * elements as direct children. Each item projects its content via `<ng-content>`,
 * so panel content can be written as ordinary HTML with full editor support.
 *
 * Note: Expanded state is initialized once in `ngAfterContentInit`. Items added
 * or removed dynamically after that point will have their `expandedByDefault` flag
 * ignored — only the programmatic `togglePanel` API applies at that stage.
 *
 * @selector ngx-uswds-accordion
 *
 * @example
 * <ngx-uswds-accordion variant="bordered" [multiselectable]="true">
 *   <ngx-uswds-accordion-item heading="Section 1" [expandedByDefault]="true">
 *     <p>Content 1</p>
 *   </ngx-uswds-accordion-item>
 *   <ngx-uswds-accordion-item heading="Section 2">
 *     <p>Content 2</p>
 *   </ngx-uswds-accordion-item>
 * </ngx-uswds-accordion>
 *
 * @example
 * <!-- All items use h3; one item overrides to h2 -->
 * <ngx-uswds-accordion [headingLevel]="3">
 *   <ngx-uswds-accordion-item heading="Section A">
 *     <p>Content A</p>
 *   </ngx-uswds-accordion-item>
 *   <ngx-uswds-accordion-item heading="Special" [headingLevel]="2">
 *     <p>Content B</p>
 *   </ngx-uswds-accordion-item>
 * </ngx-uswds-accordion>
 *
 * @input {AccordionVariant} [variant='borderless'] - The visual style of the accordion.
 *   Accepts 'borderless' for the default style or 'bordered' for a bordered style.
 *
 * @input {boolean} [multiselectable=false] - Whether multiple panels can be open at once.
 *   When false, opening a panel closes any other open panel.
 *
 * @input {HeadingLevel} [headingLevel=4] - Default heading level for all child accordion items.
 *   Accepts 2–6. Individual items can override this via their own `headingLevel` input.
 *
 * @input {string} [idPrefix] - Custom prefix for generated element IDs. If not provided,
 *   a unique prefix is auto-generated to avoid ID collisions between multiple accordions
 *   on the same page.
 */
@Component({
  selector: 'ngx-uswds-accordion',
  standalone: true,
  templateUrl: './uswds-accordion.html',
  styleUrls: ['./uswds-accordion.scss'],
})
export class UswdsAccordion implements AfterContentInit {
  // v8 ignore next
  variant = input<AccordionVariant>('borderless');
  // v8 ignore next
  multiselectable = input<boolean>(false);
  // v8 ignore next
  headingLevel = input<HeadingLevel>(4);
  // v8 ignore next
  idPrefix = input<string>();

  // v8 ignore next
  expandedIndices = signal<Set<number>>(new Set());
  // v8 ignore next
  resolvedIdPrefix = signal<string>('');

  // v8 ignore next 2
  @ContentChildren(UswdsAccordionItem)
  itemList!: QueryList<UswdsAccordionItem>;

  items(): UswdsAccordionItem[] {
    return this.itemList.toArray();
  }

  private static instanceCounter = 0;

  ngAfterContentInit(): void {
    this.resolvedIdPrefix.set(this.idPrefix() ?? this.generateUniquePrefix());
    this.assignIndices();
    this.applyDefaults();
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

  // v8 ignore next
  containerClasses = computed(() => this.buildContainerClasses());

  private buildContainerClasses(): string[] {
    const classes = ['usa-accordion'];

    if (this.variant() === 'bordered') {
      classes.push('usa-accordion--bordered');
    }

    if (this.multiselectable()) {
      classes.push('usa-accordion--multiselectable');
    }

    return classes;
  }

  private generateUniquePrefix(): string {
    UswdsAccordion.instanceCounter++;
    return `accordion-${UswdsAccordion.instanceCounter}`;
  }

  // Pushes each child's position down to it via its internal `_index` signal. This keeps data flow unidirectional: the parent is the single source of truth for ordering, and children derive their IDs and expanded state from it.
  private assignIndices(): void {
    this.items().forEach((item, i) => item._index.set(i));
  }

  private applyDefaults(): void {
    const newSet = new Set<number>();
    const children = this.items();

    for (let i = 0; i < children.length; i++) {
      if (children[i].expandedByDefault()) {
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
