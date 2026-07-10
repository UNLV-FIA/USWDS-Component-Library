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

export interface SignUpForm {
  header?: string;
  label?: string;
  buttonStyle?: ButtonStyle;
  buttonText?: string;
}

export interface AgencyInfo {
  name?: string;
  logoImagePath?: string;
  phone?: string;
  email?: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  youtube?: string;
  instagram?: string;
  rss?: string;
}
