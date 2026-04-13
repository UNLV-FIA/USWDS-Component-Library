import {
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
  signal,
  computed,
  inject,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { UswdsCheckbox } from '../uswds-checkbox/uswds-checkbox';

/**
 * @class UswdsCheckboxItem
 * @description
 * A child component of `<ngx-uswds-checkbox>` that renders a single checkbox input.
 * The native `<input type="checkbox">` is defined inside this component and is accessible
 * via `getInputElement()`. Use the `checked` getter and setter to read and write the
 * checked state programmatically after the view has initialized.
 *
 * The `name` attribute and visual variant are inherited from the parent checkbox component.
 *
 * @selector ngx-uswds-checkbox-item
 *
 * @example
 * <ngx-uswds-checkbox legend="Select any historical figure" name="historical-figures">
 *   <ngx-uswds-checkbox-item label="Sojourner Truth" value="sojourner-truth" [checkedByDefault]="true">
 *   </ngx-uswds-checkbox-item>
 *   <ngx-uswds-checkbox-item label="Frederick Douglass" value="frederick-douglass">
 *   </ngx-uswds-checkbox-item>
 * </ngx-uswds-checkbox>
 *
 * @input {string} label - The visible label text rendered next to the checkbox. Required.
 *
 * @input {string} value - The value submitted with the form when this checkbox is checked. Required.
 *
 * @input {boolean} [disabled=false] - When true, the checkbox is rendered as disabled.
 *
 * @input {string} [description] - Optional description text shown below the label (tile variant).
 *
 * @input {boolean} [checkedByDefault=false] - When true, the checkbox is pre-checked on render.
 *
 * @input {string} [id] - Custom id for the input/label pair. When not provided, an id is
 *   auto-generated from the parent checkbox's id prefix and this item's index.
 *
 * @output {boolean} checkedChange - Emits the new checked state whenever the checkbox changes.
 */
@Component({
  selector: 'ngx-uswds-checkbox-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './uswds-checkbox-item.html',
  styleUrl: './uswds-checkbox-item.scss',
})
export class UswdsCheckboxItem {
  // v8 ignore next
  label = input.required<string>();
  // v8 ignore next
  value = input.required<string>();
  // v8 ignore next
  disabled = input<boolean>(false);
  // v8 ignore next
  description = input<string>();
  // v8 ignore next
  checkedByDefault = input<boolean>(false);
  // v8 ignore next
  id = input<string>();

  checkedChange = output<boolean>();

  // Assigned by the parent UswdsCheckbox after content initialization. Not intended to
  // be set externally — use the `checkedByDefault` and `id` inputs to configure this item.
  // v8 ignore next
  readonly _index = signal<number>(-1);

  /** Read-only view of this item's position within the checkbox. */
  // v8 ignore next
  readonly index = this._index.asReadonly();

  // v8 ignore next
  private checkbox = inject(UswdsCheckbox);

  // v8 ignore next 2
  @ViewChild('inputEl')
  private inputRef!: ElementRef<HTMLInputElement>;

  // v8 ignore next
  resolvedId = computed(
    () => this.id() ?? `${this.checkbox.resolvedIdPrefix()}-${this.index() + 1}`,
  );

  // v8 ignore next
  readonly groupName = computed(() => this.checkbox.name());

  // v8 ignore next
  inputClasses = computed(() => this.inputClassesFn());
  inputClassesFn = () => {
    const classes = ['usa-checkbox__input'];
    if (this.checkbox.variant() === 'tile') {
      classes.push('usa-checkbox__input--tile');
    }
    return classes;
  };

  /** Returns the current checked state of the native input element. */
  get checked(): boolean {
    return this.inputRef?.nativeElement?.checked ?? this.checkedByDefault();
  }

  /** Sets the checked state of the native input element. */
  set checked(val: boolean) {
    if (this.inputRef?.nativeElement) {
      this.inputRef.nativeElement.checked = val;
    }
  }

  /** Returns the native `<input type="checkbox">` element. */
  getInputElement(): HTMLInputElement {
    return this.inputRef.nativeElement;
  }

  onChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(checked);
  }
}
