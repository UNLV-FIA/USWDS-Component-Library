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
