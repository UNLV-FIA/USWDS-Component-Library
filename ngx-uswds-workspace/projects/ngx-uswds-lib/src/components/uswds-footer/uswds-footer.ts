import { Component, input, output, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { UswdsButton } from '../uswds-button/uswds-button';
import { FormsModule } from '@angular/forms';
import { FooterVariant, FooterLinkColumn, AgencyInfo, SignUpForm } from './footer-types';
import { footer } from '@uswds/uswds/js';

/**
 * @class UswdsFooter
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) footer.
 * Footers...
 *
 * @selector ngx-uswds-footer
 *
 * @example
 * <!-- Using the big footer -->
 * <ngx-uswds-footer>INFO</ngx-uswds-footer>
 *
 * @input {FooterVariant} variant - The visual style of the footer.
 *   Accepts 'big', 'medium', or 'slim'.
 *
 * @input {string} [iconsPath='/assets/img/usa-icons'] - Base path to the footer icon assets.
 *   Useful when icons are hosted in a different location.
 *
 * @input {AgencyInfo} agencyInfo - An object that stores the agency's information to display in the footer.
 *   Fields include:
 *     - 'name': agency's name
 *     - 'logoImagePath': path to agency's logo
 *     - 'contactHeading': heading displayed above the agency's phone number and email
 *     - 'phone': agency's contact phone number
 *     - 'phoneLabel': optional label for the agency's phone number (e.g. (800) 555-GOVT)
 *     - 'email': agency's contact email
 *   If any of the above fields are not provided, it will not render in the footer.
 *
 * @input {FooterLinkColumn[]} [linkColumns=[]] - A list of columns of links to display in the 'big' footer.
 *   Each item requires a 'topic' and `links` for the column. Each link requires a 'label' and 'href'.
 *
 * @input {SignUpForm} signUpForm - An object that stores the form information to display in the 'big' footer.
 *   Fields include:
 *     - 'heading': heading shown above the form
 *     - 'label': label for the text input
 *     - 'buttonStyle': color style of the button
 *     - 'buttonText': text within the button
 *   If any of the above fields are not provided, it will default to hard-coded values.
 */
@Component({
  selector: 'ngx-uswds-footer',
  imports: [NgClass, UswdsButton, FormsModule],
  templateUrl: './uswds-footer.html',
  styleUrl: './uswds-footer.scss',
})
export class UswdsFooter {
  variant = input<FooterVariant>();
  iconsPath = input<string>('/assets/img/usa-icons');
  agencyInfo = input<AgencyInfo>();

  // For the big variant footer
  linkColumns = input<FooterLinkColumn[]>([]);
  signUpForm = input<SignUpForm>();
  formSubmit = output<string>(); // the function you want ran
  userEmail = '';

  ngOnInit() {
    footer.on();
  }

  // Footer variant selection function
  footerVariantCSS = computed(() => this.footerVariantCSSFn());
  footerVariantCSSFn = () => {
    const va = this.variant();
    switch (va) {
      case 'big':
        return 'usa-footer--big';
      case 'medium':
        return '';
      case 'slim':
        return 'usa-footer--slim';
      default:
        throw new Error('Invalid footer variant selected, valid variants are: [big, medium, slim]');
    }
  };

  handleSubmit() {
    if (!this.userEmail) return;
    this.formSubmit.emit(this.userEmail);
  }

  // Display the footer item if defined; otherwise, assign undefined or fall back to a default
  agencyName = computed(() => this.agencyInfo()?.name);
  agencyLogoImagePath = computed(() => this.agencyInfo()?.logoImagePath);
  agencyContactHeading = computed(() => this.agencyInfo()?.contactHeading);
  agencyPhone = computed(() => this.agencyInfo()?.phone);
  agencyPhoneLabel = computed(() => this.agencyInfo()?.phoneLabel ?? this.agencyPhone());
  agencyEmail = computed(() => this.agencyInfo()?.email);

  // Footer items for the big footer
  signUpHeading = computed(() => this.signUpForm()?.heading ?? 'Sign up');
  // to do: add this as a text input component
  signUpLabel = computed(() => this.signUpForm()?.label ?? 'Your email address');
  signUpButtonText = computed(() => this.signUpForm()?.buttonText ?? 'Sign Up');
  signUpButtonStyle = computed(() => this.signUpForm()?.buttonStyle ?? 'Default');

  // Compute icon paths for social media links
  facebookIconPath = computed(() => `${this.iconsPath()}/facebook.svg`);
  twitterIconPath = computed(() => `${this.iconsPath()}/twitter.svg`);
  youtubeIconPath = computed(() => `${this.iconsPath()}/youtube.svg`);
  instagramIconPath = computed(() => `${this.iconsPath()}/instagram.svg`);
  rssFeedIconPath = computed(() => `${this.iconsPath()}/rss_feed.svg`);
}
