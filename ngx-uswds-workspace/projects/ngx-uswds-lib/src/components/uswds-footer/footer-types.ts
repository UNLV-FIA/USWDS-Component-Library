import { ButtonStyle } from '../uswds-button/uswds-button.types';
import { TextInputWidth } from '../uswds-text-input/text-input-types';

export type FooterVariant = 'big' | 'medium' | 'slim';

export type FooterFormState = 'success' | 'error' | 'default';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkColumn {
  topic: string;
  links: FooterLink[];
}

export interface FooterForm {
  heading?: string;
  label?: string;
  inputId?: string;
  inputWidth?: TextInputWidth;
  inputHint?: string;
  buttonStyle?: ButtonStyle;
  buttonText?: string;
  successMessage?: string;
  errorMessage?: string;
}

export interface FooterAgencyInfo {
  name?: string;
  logoImagePath?: string;
  logoAlt?: string;
  contactHeading?: string;
  phoneLabel?: string;
  phone?: string;
  email?: string;
}

export interface FooterSocialLinks {
  facebook?: string;
  twitter?: string;
  youtube?: string;
  instagram?: string;
  rss?: string;
}
