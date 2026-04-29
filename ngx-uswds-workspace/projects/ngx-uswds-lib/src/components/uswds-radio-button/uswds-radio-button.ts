import {
  Component,
  input,
  signal,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { UswdsRadioButtonItem } from '../uswds-radio-button-item/uswds-radio-button-item';
import { RadioButtonVariant } from './radio-button-types';

/**
 * @class UswdsRadioButton
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) radio button group.
 * Radio buttons allow users to select exactly one choice from a group.
 *
 * Uses a compound component pattern: place one or more `<ngx-uswds-radio-button-item>` elements as
 * direct children. Each item renders its own `<input type="radio">` and label, with the
 * `name` attribute and visual variant inherited from this component.
 *
 * @selector ngx-uswds-radio-button
 *
 * @example
 * <ngx-uswds-radio-button legend="Select one historical figure" name="historical-figures">
 *   <ngx-uswds-radio-button-item label="Sojourner Truth" value="sojourner-truth" [checkedByDefault]="true">
 *   </ngx-uswds-radio-button-item>
 *   <ngx-uswds-radio-button-item label="Frederick Douglass" value="frederick-douglass">
 *   </ngx-uswds-radio-button-item>
 * </ngx-uswds-radio-button>
 *
 * @example
 * <!-- Tile variant with descriptions -->
 * <ngx-uswds-radio-button legend="Choose a frequency" name="freq" variant="tile">
 *   <ngx-uswds-radio-button-item label="Daily" value="daily" description="Sent every day">
 *   </ngx-uswds-radio-button-item>
 *   <ngx-uswds-radio-button-item label="Weekly" value="weekly" description="Sent once a week">
 *   </ngx-uswds-radio-button-item>
 * </ngx-uswds-radio-button>
 *
 * @input {string} [legend=''] - The legend text for the radio button fieldset group.
 *
 * @input {string} [name=''] - The `name` attribute shared across all radio buttons in the group.
 *   All radio buttons sharing the same `name` are mutually exclusive.
 *
 * @input {RadioButtonVariant} [variant='default'] - The display variant. Use 'tile' for larger
 *   tile-style radio buttons with optional description text.
 *
 * @input {string} [idPrefix] - Custom prefix for generated element IDs. If not provided,
 *   a unique prefix is auto-generated to avoid ID collisions between multiple radio groups
 *   on the same page.
 */
@Component({
  selector: 'ngx-uswds-radio-button',
  standalone: true,
  templateUrl: './uswds-radio-button.html',
  styleUrl: './uswds-radio-button.scss',
})
export class UswdsRadioButton implements AfterContentInit {
  // v8 ignore next
  legend = input<string>('');
  // v8 ignore next
  name = input<string>('');
  // v8 ignore next
  variant = input<RadioButtonVariant>('default');
  // v8 ignore next
  idPrefix = input<string>();

  // v8 ignore next
  resolvedIdPrefix = signal<string>('');

  // v8 ignore next 2
  @ContentChildren(UswdsRadioButtonItem)
  itemList!: QueryList<UswdsRadioButtonItem>;

  items(): UswdsRadioButtonItem[] {
    return this.itemList.toArray();
  }

  /** Returns the currently selected item, or null if none is selected. */
  getSelectedItem(): UswdsRadioButtonItem | null {
    return this.items().find((item) => item.checked) ?? null;
  }

  /** Returns all items that are not currently selected. */
  getUnselectedItems(): UswdsRadioButtonItem[] {
    return this.items().filter((item) => !item.checked);
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
    UswdsRadioButton.instanceCounter++;
    return `radio-button-${UswdsRadioButton.instanceCounter}`;
  }
}
