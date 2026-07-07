import { Component, input, computed } from '@angular/core';
import { textInputType, textInputWidth, textInputState } from './text-input-types';
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
 *   type="text"
 *   inputID="input-type-text"
 * ></ngx-uswds-text-input>
 *
 * @example
 * <!-- Using a multi-line text input -->
 * <ngx-uswds-text-input
 *   label="Text area label"
 *   type="textarea"
 *   inputID="input-type-textarea"
 * ></ngx-uswds-text-input>
 *
 * @input {string} label - The visual label text rendered next to the text input. Required.
 *
 * @input {textInputType} type - The type of the text input. 'text' sets the text input as single-lined
 *   and 'textarea' sets it to multi-lined. Required.
 *
 * @input {string} inputID - The value set for the id and name attribute for the text input. Also sets the label's for
 *   attribute. Should be unique across text input components. Required.
 *
 * @input {textInputWidth} width - The width of the text input. Accepts '2xs', 'xs', 'sm' or 'small',
 *   'md' or 'medium', 'lg', 'xl', and '2xl'.
 *
 * @input {textInputState} state - The state of the text input. 'error' sets the text input in an error state
 *   and 'success' sets the text input in a success state.
 *
 * @input {boolean} [required=false] - When true, adds the required attribute to the text input.
 *
 * @input {boolean} [disabled=false] - When true, adds the disabled attribute to the text input and
 *   and sets 'aria-disabled' to true.
 */
@Component({
  selector: 'ngx-uswds-text-input',
  imports: [NgClass],
  templateUrl: './uswds-text-input.html',
  styleUrl: './uswds-text-input.scss',
})
export class UswdsTextInput {
  // v8 ignore next
  label = input.required<string>();
  // v8 ignore next
  type = input.required<textInputType>();
  // v8 ignore next
  inputID = input.required<string>();
  // v8 ignore next
  width = input<textInputWidth>();
  // v8 ignore next
  state = input<textInputState>();
  // v8 ignore next
  required = input<boolean>(false);
  // v8 ignore next
  disabled = input<boolean>(false);

  ngOnInit(): void {
    if (this.label() === '') {
      throw new Error('Propery "label" is required and cannot be an empty string');
    }
    if (this.inputID() === '') {
      throw new Error('Propery "inputID" is required and cannot be an empty string');
    }
  }

  // Type of text input selection function
  // v8 ignore next
  textInputTypeID = computed(() => this.textInputTypeIDFn());
  textInputTypeIDFn = () => {
    const ty = this.type();
    switch (ty) {
      case 'text':
        return 'input-type-text';
      case 'textarea':
        return 'input-type-textarea';
      default:
        throw new Error('Invalid text input type selected, valid types are: [text, textarea]');
    }
  };

  // Adds the classes for width and state of text input
  // v8 ignore next
  inputClasses = computed(() => this.inputClassesFn());
  inputClassesFn = () => {
    const classes = [''];
    const wid = this.width();
    const st = this.state();

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
}
