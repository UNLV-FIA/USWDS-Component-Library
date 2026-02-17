import { Component, AfterViewInit, input, output } from '@angular/core';
import { button } from '@uswds/uswds/js';
import { ButtonType, ButtonStyle } from './uswds-button.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-uswds-button',
  imports: [CommonModule],
  templateUrl: './uswds-button.html',
  styleUrl: './uswds-button.scss',
})

/***
 * @class
 * @description
 * An angular component that renders a customizable button ensuring consistent styling with uswds components.
 * @selector ngx-uswds-button
 */
export class UswdsButton implements AfterViewInit {
  /**
   * Chooses the type of button, view defined types
   * Possible Values:
   * - 'submit'
   * - 'button'
   * - 'reset'
   */
  // c8 ignore next
  type = input.required<ButtonType>();
  /**
   * Enables or disables the button
   * @default false
   */
  // c8 ignore next
  disabled = input<boolean>(false);

  /**
   * Allows function passthrough,
   * will run a function provided on the click event.
   */
  // c8 ignore next
  clicked = output<void>();

  /**
   * Set the button to big
    @default false  
  */
  // c8 ignore next
  bigButton = input<boolean>(false);
  /**
   * Select the color style for the component
   * 1. Default
   * 2. Secondary Color
   * 3. Accent Cool Color
   * 4. Accent warm color
   * 5. Base Color
   * 6. Outlined
   * 7. Outline Inverse
   */
  // c8 ignore next
  buttonStyle = input<ButtonStyle>('Default');

  ngAfterViewInit(): void {
    button?.on();
  }

  // Button style selection function
  buttonStyleCSS(): string {
    if (this.buttonStyle() == 'Default') return '';

    switch (this.buttonStyle()) {
      case 'Secondary':
        return 'usa-button--secondary';
      case 'AccentCool':
        return 'usa-button--accent-cool';
      case 'AccentWarm':
        return 'usa-button--accent-warm';
      case 'Base':
        return 'usa-button--base';
      case 'Outline':
        return 'usa-button--outline';
      case 'OutlineInverse':
        return 'usa-button--outline usa-button--inverse';
      case 'Unstyled':
        return 'usa-button--unstyled';
      default:
        throw new Error(
          'Provided style does not exist, valid types are: [Secondary, AccentCool, Base, Outline, OutlineInverse, Unstyled]',
        );
    }
  }

  buttonTypeSelection(): string {
    switch (this.type()) {
      case 'submit':
        return 'submit';
      case 'button':
        return 'button';
      case 'reset':
        return 'reset';
      default:
        throw new Error('Invalid type selected, valid options are [submit, button, reset]');
    }
  }

  onClick() {
    this.clicked.emit();
  }
}
