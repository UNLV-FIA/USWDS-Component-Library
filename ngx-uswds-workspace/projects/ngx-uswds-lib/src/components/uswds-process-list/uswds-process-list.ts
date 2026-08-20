import { Component, input, ContentChildren, QueryList } from '@angular/core';
import { ProcessListHeadingLevel } from './process-list-types';
import { UswdsProcessListItem } from '../uswds-process-list-item/uswds-process-list-item';

/**
 * @class UswdsProcessList
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) process list.
 * Process lists display the steps or stages of important instructions or processes sequentially.
 * A process list includes counters (a step number in a circle), headings, rich text content, and
 * connector lines between counters.
 *
 * Uses a compound component pattern: place `<li ngx-uswds-process-list-item>` elements as direct children.
 * Each item renders its own heading text and projects its content via `<ng-content>`, with the heading
 * level and styling classes inherited from this component.
 *
 * @selector ngx-uswds-process-list
 *
 * @example
 * <ngx-uswds-process-list [headingLevel]="3" headingClasses="font-sans-xl">
 *   <li ngx-uswds-process-list-item heading="Start a process">
 *     <p>Content 1</p>
 *   </li>
 *   <li ngx-uswds-process-list-item heading="Proceed to the second step">
 *     <p>Content 2</p>
 *   </li>
 * </ngx-uswds-process-list>
 *
 * @input {ProcessListHeadingLevel} [headingLevel=4] - The heading level of all
 *   the headings in the proccess list. Accepts 2-6.
 *
 * @input {string} headingClasses - A space-separated list of classes to be applied
 *   to all the headings in the proccess list such as text styles.
 */
@Component({
  selector: 'ngx-uswds-process-list',
  templateUrl: './uswds-process-list.html',
  styleUrl: './uswds-process-list.scss',
})
export class UswdsProcessList {
  // v8 ignore next
  headingLevel = input<ProcessListHeadingLevel>(4);
  // v8 ignore next
  headingClasses = input<string>();

  // v8 ignore next 2
  @ContentChildren(UswdsProcessListItem)
  itemList!: QueryList<UswdsProcessListItem>;
}
