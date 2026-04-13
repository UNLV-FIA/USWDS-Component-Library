import {
  Component,
  input,
  signal,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { UswdsCheckboxItem } from '../uswds-checkbox-item/uswds-checkbox-item';
import { CheckboxVariant } from './checkbox-types';

/**
 * @class UswdsCheckbox
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) checkbox group.
 * Checkboxes allow users to select one or more options from a list.
 *
 * Uses a compound component pattern: place one or more `<ngx-uswds-checkbox-item>` elements as
 * direct children. Each item renders its own `<input type="checkbox">` and label, with the
 * `name` attribute and visual variant inherited from this component.
 *
 * @selector ngx-uswds-checkbox
 *
 * @example
 * <ngx-uswds-checkbox legend="Select any historical figure" name="historical-figures">
 *   <ngx-uswds-checkbox-item label="Sojourner Truth" value="sojourner-truth" [checkedByDefault]="true">
 *   </ngx-uswds-checkbox-item>
 *   <ngx-uswds-checkbox-item label="Frederick Douglass" value="frederick-douglass">
 *   </ngx-uswds-checkbox-item>
 * </ngx-uswds-checkbox>
 *
 * @example
 * <!-- Tile variant with descriptions -->
 * <ngx-uswds-checkbox legend="Choose a frequency" name="freq" variant="tile">
 *   <ngx-uswds-checkbox-item label="Daily" value="daily" description="Sent every day">
 *   </ngx-uswds-checkbox-item>
 *   <ngx-uswds-checkbox-item label="Weekly" value="weekly" description="Sent once a week">
 *   </ngx-uswds-checkbox-item>
 * </ngx-uswds-checkbox>
 *
 * @input {string} [legend=''] - The legend text for the checkbox fieldset group.
 *
 * @input {string} [name=''] - The `name` attribute shared across all checkboxes in the group.
 *
 * @input {CheckboxVariant} [variant='default'] - The display variant. Use 'tile' for larger
 *   tile-style checkboxes with optional description text.
 *
 * @input {string} [idPrefix] - Custom prefix for generated element IDs. If not provided,
 *   a unique prefix is auto-generated to avoid ID collisions between multiple checkboxes
 *   on the same page.
 */
@Component({
  selector: 'ngx-uswds-checkbox',
  standalone: true,
  templateUrl: './uswds-checkbox.html',
  styleUrl: './uswds-checkbox.scss',
})
export class UswdsCheckbox implements AfterContentInit {
  // v8 ignore next
  legend = input<string>('');
  // v8 ignore next
  name = input<string>('');
  // v8 ignore next
  variant = input<CheckboxVariant>('default');
  // v8 ignore next
  idPrefix = input<string>();

  // v8 ignore next
  resolvedIdPrefix = signal<string>('');

  // v8 ignore next 2
  @ContentChildren(UswdsCheckboxItem)
  itemList!: QueryList<UswdsCheckboxItem>;

  items(): UswdsCheckboxItem[] {
    return this.itemList.toArray();
  }

  private static instanceCounter = 0;

  ngAfterContentInit(): void {
    this.resolvedIdPrefix.set(this.idPrefix() ?? this.generateUniquePrefix());
    this.assignIndices();
  }

  private assignIndices(): void {
    this.items().forEach((item, i) => item._index.set(i));
  }

  private generateUniquePrefix(): string {
    UswdsCheckbox.instanceCounter++;
    return `checkbox-${UswdsCheckbox.instanceCounter}`;
  }
}
