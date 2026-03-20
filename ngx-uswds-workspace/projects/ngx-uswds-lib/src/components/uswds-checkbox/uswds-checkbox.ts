import { Component, computed, effect, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';

export interface CheckboxItem {
  id: string;
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  description?: string;
}

export type CheckboxVariant = 'default' | 'tile';

/**
 * @class UswdsCheckbox
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) checkbox group.
 * Checkboxes allow users to select one or more options from a list.
 * Each item in the `items` array renders a checkbox input and associated label. Items may be
 * pre-checked, disabled, or include an optional description for the tile variant.
 *
 * @selector ngx-uswds-checkbox
 *
 * @example
 * <ngx-uswds-checkbox
 *   legend="Select any historical figure"
 *   name="historical-figures"
 *   [items]="checkboxItems"
 *   (checkedChange)="onSelectionChange($event)"
 * ></ngx-uswds-checkbox>
 *
 * @input {string} [legend=''] - The legend text for the checkbox fieldset group.
 *
 * @input {CheckboxItem[]} [items=[]] - The list of checkbox items to display. Each item requires
 *   `id`, `label`, and `value`. Optional properties: `checked`, `disabled`, `description`.
 *
 * @input {CheckboxVariant} [variant='default'] - The display variant. Use 'tile' for larger
 *   tile-style checkboxes with optional description text.
 *
 * @input {string} [name=''] - The `name` attribute shared across all checkboxes in the group.
 *
 * @output {CheckboxItem[]} checkedChange - Emits the full updated items array whenever any
 *   checkbox is toggled, with the changed item's `checked` property updated.
 */

@Component({
  selector: 'ngx-uswds-checkbox',
  standalone: true,
  imports: [NgClass],
  templateUrl: './uswds-checkbox.html',
  styleUrls: ['./uswds-checkbox.scss'],
})
export class UswdsCheckbox {
  // v8 ignore next
  legend = input<string>('');
  // v8 ignore next
  items = input<CheckboxItem[]>([]);
  // v8 ignore next
  variant = input<CheckboxVariant>('default');
  // v8 ignore next
  name = input<string>('');

  checkedChange = output<CheckboxItem[]>();

  // v8 ignore next
  internalItems = signal<CheckboxItem[]>([]);

  constructor() {
    effect(() => {
      this.internalItems.set(this.items().map((item) => ({ ...item })));
    });
  }

  // v8 ignore next
  inputClasses = computed(() => this.inputClassesFn());
  inputClassesFn = () => {
    const classes = ['usa-checkbox__input'];
    if (this.variant() === 'tile') {
      classes.push('usa-checkbox__input--tile');
    }
    return classes;
  };

  onCheckboxChange(item: CheckboxItem, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.internalItems.update((items) =>
      items.map((i) => (i.id === item.id ? { ...i, checked } : i)),
    );
    this.checkedChange.emit(this.internalItems());
  }
}
