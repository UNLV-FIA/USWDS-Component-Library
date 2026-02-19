import { Component, input, signal, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { UswdsAccordion } from './uswds-accordion';
import { HeadingLevel } from './accordion-types';

/**
 * @class UswdsAccordionItem
 * @description
 * A child component of `<ngx-uswds-accordion>` that renders a single accordion panel.
 * Content is projected via `<ng-content>`, allowing arbitrary HTML to be placed inside
 * each panel without stringification.
 *
 * The parent accordion assigns this item's index after content initialization via
 * `_index`, which drives all ID generation and expanded-state lookups.
 *
 * @selector ngx-uswds-accordion-item
 *
 * @example
 * <ngx-uswds-accordion-item heading="Section Title" [expandedByDefault]="true">
 *   <p>Any HTML content goes here — no stringification needed.</p>
 * </ngx-uswds-accordion-item>
 *
 * @example
 * <!-- Override the parent accordion's headingLevel for a single item -->
 * <ngx-uswds-accordion-item heading="Important" [headingLevel]="2">
 *   <h3>Sub-section</h3>
 * </ngx-uswds-accordion-item>
 *
 * @input {string} heading - The visible label rendered in the accordion button. Required.
 *
 * @input {boolean} [expandedByDefault=false] - When true, this panel opens on initial render.
 *   In single-select mode, only the first item with this flag set will be opened.
 *
 * @input {HeadingLevel} [headingLevel] - The HTML heading level (2–6) for this item's heading
 *   wrapper element. When not set, the value falls back to the parent accordion's `headingLevel`
 *   (which itself defaults to 4, producing `<h4>`). Setting this on an individual item overrides
 *   the parent default for that item only.
 */
@Component({
  selector: 'ngx-uswds-accordion-item',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <ng-template #btn>
      <button
        type="button"
        class="usa-accordion__button"
        [id]="buttonId()"
        [attr.aria-expanded]="expanded() ? 'true' : 'false'"
        [attr.aria-controls]="contentId()"
        (click)="toggle()"
      >
        {{ heading() }}
      </button>
    </ng-template>

    @switch (resolvedHeadingLevel()) {
      @case (2) {
        <h2 class="usa-accordion__heading"><ng-container *ngTemplateOutlet="btn" /></h2>
      }
      @case (3) {
        <h3 class="usa-accordion__heading"><ng-container *ngTemplateOutlet="btn" /></h3>
      }
      @case (5) {
        <h5 class="usa-accordion__heading"><ng-container *ngTemplateOutlet="btn" /></h5>
      }
      @case (6) {
        <h6 class="usa-accordion__heading"><ng-container *ngTemplateOutlet="btn" /></h6>
      }
      @default {
        <h4 class="usa-accordion__heading"><ng-container *ngTemplateOutlet="btn" /></h4>
      }
    }

    <div
      [id]="contentId()"
      class="usa-accordion__content usa-prose"
      role="region"
      [attr.aria-labelledby]="buttonId()"
      [hidden]="!expanded()"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class UswdsAccordionItem {
  heading = input.required<string>();
  expandedByDefault = input<boolean>(false);
  headingLevel = input<HeadingLevel>();

  /**
   * Assigned by the parent `UswdsAccordion` after content initialization.
   * Not intended to be set externally — use the `heading` and `expandedByDefault`
   * inputs to configure this item.
   *
   * @internal
   */
  readonly _index = signal<number>(-1);

  /** Read-only view of this item's position within the accordion. */
  readonly index = this._index.asReadonly();

  private accordion = inject(UswdsAccordion);

  /**
   * The effective heading level for this item. Uses the item's own `headingLevel`
   * input when provided; otherwise falls back to the parent accordion's `headingLevel`
   * (default: 4).
   */
  resolvedHeadingLevel = computed(() => this.headingLevel() ?? this.accordion.headingLevel());

  expanded = computed(() => this.accordion.isExpanded(this.index()));

  contentId = computed(() => `${this.accordion.resolvedIdPrefix()}-${this.index() + 1}`);

  buttonId = computed(() => `${this.accordion.resolvedIdPrefix()}-btn-${this.index() + 1}`);

  toggle(): void {
    this.accordion.togglePanel(this.index());
  }
}
