import { ButtonStyle } from '../uswds-button/uswds-button.types';
import { TextInputWidth } from '../uswds-text-input/text-input-types';

export type FooterVariant = 'big' | 'medium' | 'slim';

export type FooterFormState = 'success' | 'error' | 'default';

export type FooterHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkColumns {
  headingLevel?: FooterHeadingLevel;
  columns: FooterLinkColumn[];
}

export interface FooterLinkColumn {
  topic: string;
  links: FooterLink[];
}

export interface FooterForm {
  heading?: string;
  headingLevel?: FooterHeadingLevel;
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
