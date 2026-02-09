import { Component, OnInit, input, output } from '@angular/core';
import { button } from '@uswds/uswds/js';
import { ButtonType, ButtonStyle, ButtonState } from './uswds-button.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-uswds-button',
  imports: [CommonModule],
  templateUrl: './uswds-button.html',
  styleUrl: './uswds-button.css',
})
export class UswdsButton implements OnInit {
  /**
   * Sets the text of the button
   */
  text = input.required<string>();
  /**
   * Chooses the type of button, view defined types
   * Possible Values:
   * - 'submit'
   * - 'button'
   * - 'reset'
   */
  type = input.required<ButtonType>();
  /**
   * Enables or disables the button
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Sets the aria-disabled
   * @default false
   */
  ariaDisabled = input<boolean>(false);

  /**
   * Allows function passthrough,
   * will run a function provided on the click event.
   */
  clicked = output<void>();

  /**
   * Set the button to big
    @default false  
  */
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
  buttonStyle = input<ButtonStyle>('Default');

  /**
   * Define the button state manually
   * 1. Default
   * 2. Hover
   * 3. Active
   * 4. Focus
   */
  buttonState = input<ButtonState>('Default');

  ngOnInit(): void {
    if (!this.text() || this.text().trim() == '')
      throw new Error("Prop 'text' must be defined and cannot be empty string");
    button.on();
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
        return 'usa-button--inverse';
      case 'Unstyled':
        return 'usa-button--unstyled';
      default:
        throw new Error(
          'Provided style does not exist, valid types are: [Secondary, AccentCool, Base, Outline, OutlineInverse, Unstyled]',
        );
    }
  }

  buttonStateCSS(): string {
    switch (this.buttonState()) {
      case 'Focus':
        return 'usa-focus';
      case 'Active':
        return 'usa-button--active';
      case 'Hover':
        return 'usa-button--hover';
      default:
        return '';
    }
  }
}
