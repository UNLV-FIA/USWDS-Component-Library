import { Component, input, computed } from '@angular/core';
import { textInputType, textInputWidth, textInputState } from './text-input-types';
import { NgClass } from '@angular/common';

/**
 * @class UswdsTextInput
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) text input.
 * Text input allows users to enter letters, numbers, or symbols useful for unpredicatable responses and pasted content.
 * Text input boxes can be single or multiple lines.
 *
 * @selector ngx-uswds-text-input
 *
 * @example
 * <!-- Example -->
 *
 *
 * @input {type} [varname='default val'] -
 *
 */
@Component({
  selector: 'ngx-uswds-text-input',
  imports: [NgClass],
  templateUrl: './uswds-text-input.html',
  styleUrl: './uswds-text-input.scss',
})
export class UswdsTextInput {
  label = input.required<string>(); // required (maybe use.required here?)
  type = input.required<textInputType>(); // required
  width = input<textInputWidth>(); // optional
  state = input<textInputState>(); // optional

  ngOnInit(): void {
    if (this.label() === '') {
      throw new Error("Propery 'label' is required and cannot be an empty string");
    }
  }

  // Type of text input selection function
  textInputTypeID = computed(() => this.textInputTypeIDFn());
  textInputTypeIDFn = () => {
    const val = this.type();
    switch (val) {
      case 'text':
        return 'input-type-text';
      case 'textarea':
        return 'input-type-textarea';
      default:
        throw new Error('Invalid text input type selected, valid types are: [text, textarea]');
    }
  };

  // Computes the classes for width and state of text input
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
