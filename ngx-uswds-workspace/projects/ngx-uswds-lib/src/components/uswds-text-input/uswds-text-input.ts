import { Component, input, computed } from '@angular/core';
import {
  TextInputVariant,
  TextInputWidth,
  TextInputState,
  HintEl,
  InputType,
  TextInputAutocomplete,
} from './text-input-types';
import { NgClass } from '@angular/common';

/**
 * @class UswdsTextInput
 * @description
 * An Angular component that renders a U.S. Web Design System (USWDS) text input.
 * Text input allows users to enter letters, numbers, or symbols useful for unpredicatable responses and pasted content.
 * Text input boxes can be single or multiple lines.
 *
 * @selector ngx-uswds-text-input
 *
 * @example
 * <!-- Using a single-line text input -->
 * <ngx-uswds-text-input
 *   label="Text input label"
 *   variant="text"
 *   inputId="input-type-text"
 * ></ngx-uswds-text-input>
 *
 * @example
 * <!-- Using a multi-line text input -->
 * <ngx-uswds-text-input
 *   label="Text area label"
 *   variant="textarea"
 *   inputId="input-type-textarea"
 * ></ngx-uswds-text-input>
 *
 * @input {string} label - The visual label text rendered next to the text input. Can be omitted to allow
 *   custom HTML around the input/textarea element.
 *
 * @input {TextInputVariant} [variant='text'] - The variant of the text input. 'text' sets the text input as single-lined (input tag)
 *   and 'textarea' sets it to multi-lined (textarea tag). Required.
 *
 * @input {string} inputId - The value set for the id and name attribute for the text input. Also sets the label's for
 *   attribute. Should be unique across text input components. Required.
 *
 * @input {TextInputWidth} width - The width of the text input. Accepts '2xs', 'xs', 'sm' or 'small',
 *   'md' or 'medium', 'lg', 'xl', and '2xl'.
 *
 * @input {TextInputState} state - The state of the text input. 'error' sets the text input in an error state
 *   and 'success' sets the text input in a success state.
 *
 * @input {string} hint - The optional text that can be put in between the label and text input.
 *
 * @input {HintEl} [hintEl='span'] - The element used to display the hint. Accepts 'span' and 'div'.
 *
 * @input {boolean} [required=false] - When true, adds the required attribute to the text input.
 *
 * @input {boolean} [ariaDisabled=false] - When true, sets 'aria-disabled' to true and disables typing within the text input.
 *
 * @input {string} ariaDescribedBy - Space-seperated list of element ids outside this component that describe this input.
 *   Placed into 'aria-describedby' alongside the hint id.
 *
 * @input {number} maxLen - Defines the maximum number of characters that the user can enter in a text input.
 *
 * @input {InputType} type - Defines the value for the type attribute of the input element. Only for the 'text' variant.
 *
 * @input {TextInputAutocomplete} autocomplete - Defines the value for the autocomplete attribute of the text input.
 */
@Component({
  selector: 'ngx-uswds-text-input',
  imports: [NgClass],
  templateUrl: './uswds-text-input.html',
  styleUrl: './uswds-text-input.scss',
})
export class UswdsTextInput {
  // v8 ignore next
  label = input<string>();
  // v8 ignore next
  variant = input<TextInputVariant>('text');
  // v8 ignore next
  inputId = input.required<string>();
  // v8 ignore next
  width = input<TextInputWidth>();
  // v8 ignore next
  state = input<TextInputState>();
  // v8 ignore next
  hint = input<string>();
  // v8 ignore next
  hintEl = input<HintEl>('span');

  // Text input attributes
  // v8 ignore next
  required = input<boolean>(false);
  // v8 ignore next
  ariaDisabled = input<boolean>(false);
  // v8 ignore next
  ariaDescribedBy = input<string>();
  // v8 ignore next
  maxLen = input<number>();
  // v8 ignore next
  type = input<InputType>();
  // v8 ignore next
  autocomplete = input<TextInputAutocomplete>();

  ngOnInit(): void {
    if (this.inputId() === '') {
      throw new Error('Propery "inputId" is required and cannot be an empty string');
    }
  }

  // v8 ignore next
  computedAriaDisabled = computed(() => (this.ariaDisabled() ? true : null));

  // v8 ignore next
  hintId = computed(() => (this.hint() ? `${this.inputId()}-hint` : null));

  // v8 ignore next
  computedAriaDescribedBy = computed(() => this.computedAriaDescribedByFn());
  computedAriaDescribedByFn = () => {
    const ids = [];
    if (this.hint()) {
      ids.push(this.hintId());
    }
    if (this.ariaDescribedBy()) {
      ids.push(this.ariaDescribedBy());
    }
    return ids.length ? ids.join(' ') : null;
  };

  // Adds CSS classes to the text input
  // v8 ignore next
  inputClasses = computed(() => this.inputClassesFn());
  inputClassesFn = () => {
    const classes = [];
    const wid = this.width();
    const st = this.state();

    // If a max length is defined, add the character count class
    if (this.maxLen()) {
      classes.push('usa-character-count__field');
    }

    // Add CSS for text input's width
    switch (wid) {
      case undefined:
        break;
      case '2xs':
      case 'xs':
      case 'small':
      case 'sm':
      case 'medium':
      case 'md':
      case 'lg':
      case 'xl':
      case '2xl':
        classes.push(`usa-input--${this.width()}`);
        break;
      default:
        throw new Error(
          'Invalid text input width selected, valid widths are: [2xs, xs, sm or small, md or medium, lg, xl, 2xl]',
        );
    }

    // Add CSS for text input's state
    switch (st) {
      case undefined:
        break;
      case 'error':
        classes.push('usa-input--error');
        break;
      case 'success':
        classes.push('usa-input--success');
        break;
      default:
        throw new Error('Invalid text input state selected, valid states are: [error, success]');
    }
    return classes;
  };

  // Prevent keyboard interaction when the text input is disabled unless is keyboard navigation
  onKeydown(event: KeyboardEvent): void {
    if (this.ariaDisabled() && event.key != 'Tab') {
      event.preventDefault();
    }
  }
}
