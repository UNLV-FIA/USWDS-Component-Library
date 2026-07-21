import { ButtonStyle } from '../uswds-button/uswds-button.types';

export type FooterVariant = 'big' | 'medium' | 'slim';

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
  buttonStyle?: ButtonStyle;
  buttonText?: string;
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
