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
import { UswdsRadioButton } from '../uswds-radio-button/uswds-radio-button';

/**
 * @class UswdsRadioButtonItem
 * @description
 * A child component of `<ngx-uswds-radio-button>` that renders a single radio button input.
 * The native `<input type="radio">` is defined inside this component and is accessible
 * via `getInputElement()`. Use the `checked` getter to read the selected state.
 *
 * The `name` attribute and visual variant are inherited from the parent radio button component.
 * Because radio buttons are mutually exclusive within a group, only one item may be
 * selected at a time.
 *
 * @selector ngx-uswds-radio-button-item
 *
 * @example
 * <ngx-uswds-radio-button legend="Select one historical figure" name="historical-figures">
 *   <ngx-uswds-radio-button-item label="Sojourner Truth" value="sojourner-truth" [checkedByDefault]="true">
 *   </ngx-uswds-radio-button-item>
 *   <ngx-uswds-radio-button-item label="Frederick Douglass" value="frederick-douglass">
 *   </ngx-uswds-radio-button-item>
 * </ngx-uswds-radio-button>
 *
 * @input {string} label - The visible label text rendered next to the radio button. Required.
 *
 * @input {string} value - The value submitted with the form when this radio button is selected. Required.
 *
 * @input {boolean} [disabled=false] - When true, the radio button is rendered as disabled.
 *
 * @input {string} [description] - Optional description text shown below the label (tile variant).
 *
 * @input {boolean} [checkedByDefault=false] - When true, this radio button is pre-selected on render.
 *   Only one item in a group should have this set to true.
 *
 * @input {string} [inputId] - Custom id for the input/label pair. When not provided, an id is
 *   auto-generated from the parent radio button's id prefix and this item's index.
 *
 * @output {boolean} selectedChange - Emits the new selected state whenever the radio button changes.
 */
@Component({
  selector: 'ngx-uswds-radio-button-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './uswds-radio-button-item.html',
  styleUrl: './uswds-radio-button-item.scss',
})
export class UswdsRadioButtonItem {
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
  inputId = input<string>();

  selectedChange = output<boolean>();

  // Assigned by the parent UswdsRadioButton after content initialization. Not intended to
  // be set externally — use the `checkedByDefault` and `id` inputs to configure this item.
  // v8 ignore next
  readonly _index = signal<number>(-1);

  /** Read-only view of this item's position within the radio button group. */
  // v8 ignore next
  readonly index = this._index.asReadonly();

  // v8 ignore next
  private radioButton = inject(UswdsRadioButton);

  // v8 ignore next 2
  @ViewChild('inputEl')
  private inputRef!: ElementRef<HTMLInputElement>;

  // v8 ignore next
  resolvedId = computed(
    () => this.inputId() ?? `${this.radioButton.resolvedIdPrefix()}-${this.index() + 1}`,
  );

  // v8 ignore next
  readonly groupName = computed(() => this.radioButton.name());

  // v8 ignore next
  inputClasses = computed(() => this.inputClassesFn());
  inputClassesFn = () => {
    const classes = ['usa-radio__input'];
    if (this.radioButton.variant() === 'tile') {
      classes.push('usa-radio__input--tile');
    }
    return classes;
  };

  /** Returns the current selected state of the native input element. */
  get checked(): boolean {
    return this.inputRef.nativeElement.checked;
  }

  /** Sets the selected state of the native input element. */
  set checked(val: boolean) {
    this.inputRef.nativeElement.checked = val;
  }

  /** Returns the native `<input type="radio">` element. */
  getInputElement(): HTMLInputElement {
    return this.inputRef.nativeElement;
  }

  onChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedChange.emit(checked);
  }
}
