import { Component, input, inject, computed } from '@angular/core';
import { UswdsProcessList } from '../uswds-process-list/uswds-process-list';

/**
 * @class UswdsProcessListItem
 * @description
 * A child component of `<ngx-uswds-process-list>` that renders an individual process step.
 * It includes a counter (a step number in a circle), a heading, and any rich text content including HTML.
 * It is recommended to only use three to ten steps per process list to minimize confusion and complexity.
 *
 * This item's heading level and classes are inherited from the parent process list component.
 * Apply the `class` attribute directly to this component to add list item-specific styles such as padding.
 *
 * @selector li[ngx-uswds-process-list-item]
 *
 * @example
 * <li ngx-uswds-process-list-item heading="Start a process" class="padding-bottom-4">
 *   <p>Content</p>
 *   <img src="example.jpg" alt="Example image">
 * </li>
 *
 * @input {string} heading - The heading text displayed next to the counter. Required.
 */
@Component({
  selector: 'li[ngx-uswds-process-list-item]',
  templateUrl: './uswds-process-list-item.html',
  styleUrl: './uswds-process-list-item.scss',
  host: {
    class: 'usa-process-list__item',
  },
})
export class UswdsProcessListItem {
  // v8 ignore next
  heading = input.required<string>();
  private processList = inject(UswdsProcessList);

  // v8 ignore next
  resolvedHeadingLevel = computed(() => this.processList.headingLevel());
  // v8 ignore next
  resolvedHeadingClasses = computed(() => this.processList.headingClasses());
}
