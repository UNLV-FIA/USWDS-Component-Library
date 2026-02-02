import { Component, OnInit, input } from '@angular/core';
import { button } from '@uswds/uswds/js';
import { ButtonType, ButtonStyle, ButtonState } from './uswds-button.types';
import { CommonModule } from '@angular/common';
import { startWith } from 'rxjs';

@Component({
  selector: 'ngx-uswds-button',
  imports: [CommonModule],
  templateUrl: './uswds-button.html',
  styleUrl: './uswds-button.css',
})
export class UswdsButton implements OnInit {
  text = input.required<string>();
  type = input.required<ButtonType>();
  disabled = input<boolean>(false);
  ariaDisabled = input<boolean>(false);
  // Two options (double selection not allowed):
  // 1. Big Button
  // 2. Normal Sized Button
  bigButton = input<boolean>(false);
  // Color Selection
  /**
   * 1. Default
   * 2. Secondary Color
   * 3. Accent Cool Color
   * 4. Accent warm color
   * 5. Base Color
   * 6. Outlined
   * 7. Outline Inverse
   */
  buttonStyle = input<ButtonStyle>('Default');

  // Button State
  /**
   * 1. Default
   * 2. Hover
   * 3. Active
   * 4. Focus
   */
  buttonState = input<ButtonState>('Default');

  ngOnInit(): void {
    if (!this.text() || this.text().trim() == '')
      throw new Error("prop 'text' must be defined and cannot be empty string");
    button.on();
  }

  buttonStyleCSS(): string {
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
        return 'usa-button-unstyled';
      default:
        return '';
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
