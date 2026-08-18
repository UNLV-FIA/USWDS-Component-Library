import { Component, AfterViewInit, input, computed, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { UswdsButton } from '../uswds-button/uswds-button';
import { UswdsTextInput } from '../uswds-text-input/uswds-text-input';
import { TextInputState } from '../uswds-text-input/text-input-types';
import {
  FooterVariant,
  FooterFormState,
  FooterLink,
  FooterLinkColumn,
  FooterAgencyInfo,
  FooterForm,
  FooterSocialLinks,
} from './footer-types';
import { footer } from '@uswds/uswds/js';
import { FormField, form, email, ValidationError } from '@angular/forms/signals';

/**
 * @class UswdsFooter
 * @description
 * An Angular standalone component that renders a U.S. Web Design System (USWDS) footer.
 * Footers are for users who scroll to the bottom of a page without finding what they want.
 * They compose of links that may answer the user's remaining questions or aid in the site's navigation.
 * They also include the agency's name and logo and may optionally have a newsletter signup and social media links.
 *
 * They support a big, medium, and slim visual variant.
 * The big variant contains a Signal Form intended for email input only.
 *
 * @selector ngx-uswds-footer
 *
 * @example
 * <!-- Using the slim footer -->
 * <ngx-uswds-footer
 *   variant="slim"
 *   [links]="[
 *     { label: 'Link1', href: '/Link1' },
 *     { label: 'Link2', href: '/Link2' },
 *   ]"
 *   [agencyInfo]="{
 *     name: 'Name of Agency',
 *     logoImagePath: '/assets/img/logo-img.png',
 *     email: 'info@agency.gov',
 *     phone: '1-800-555-5555',
 *     phoneLabel: '(800) 555-GOVT',
 *   }"
 * ></ngx-uswds-footer>
 *
 * @input {FooterVariant} variant - The visual style of the footer.
 *   Accepts 'big', 'medium', or 'slim'. Required.
 *
 * @input {string} [iconsPath='/assets/img/usa-icons'] - Base path to the footer icon assets.
 *   Useful when icons are hosted in a different location.
 *
 * @input {FooterAgencyInfo} agencyInfo - An object that stores the agency's information to display in the footer.
 *   Fields include:
 *     - 'name': Agency's name
 *     - 'logoImagePath': Path to agency's logo
 *     - 'logoAlt': The alternative text of the logo. Leave undefined if the logo is decorative.
 *     - 'contactHeading': Heading displayed above the agency's phone number and email
 *     - 'phone': Agency's contact phone number
 *     - 'phoneLabel': Optional label for the agency's phone number (e.g. (800) 555-GOVT)
 *     - 'email': Agency's contact email
 *   If any of the above fields are not provided, it will not render in the footer.
 *
 * @input {FooterLinkColumn[]} [linkColumns=[]] - A list of columns of links to display in the 'big' footer only.
 *   Each item requires a 'topic' and `links` for the column. Each link requires a 'label' and 'href'.
 *
 * @input {FooterLink[]} [links=[]] - A list of links to display in the 'medium' and 'slim' footer only.
 *    Each item requires a 'label' and `href`.
 *
 * @input {FooterForm} signUpFormInfo - An object that stores the form information to display in the 'big' footer.
 *   Fields include:
 *     - 'heading': Heading shown above the form
 *     - 'label': Label for the text input
 *     - 'inputId': ID of the text input
 *     - 'inputWidth': Width of the text input
 *     - 'inputHint': Optional text between the label and text input
 *     - 'buttonStyle': Color style of the button
 *     - 'buttonText': Text within the button
 *     - 'successMessage': Message displayed when form is successfully sent
 *     - 'errorMessage': Message displayed when the email address is in an invalid format
 *   If any of the above fields are not provided, it will default to hard-coded values. The exceptions are
 *   `inputWidth` and `inputHint` which are not applied to the text input when omitted.
 *
 * @input {FooterSocialLinks} socials - An object that stores links to the agency's social medias to display in
 *   the 'big' and 'medium' footer. Fields include 'facebook', 'twitter', 'youtube', 'instagram', and 'rss'.
 *   If any of the fields are not provided, it will not render in the footer.
 *
 * @output {string} formSubmit - Emits the email whenever the form is submitted in the 'big' footer.
 */
@Component({
  selector: 'ngx-uswds-footer',
  imports: [NgClass, UswdsButton, UswdsTextInput, FormField],
  templateUrl: './uswds-footer.html',
  styleUrl: './uswds-footer.scss',
})
export class UswdsFooter implements AfterViewInit {
  // v8 ignore next
  iconsPath = input<string>('/assets/img/usa-icons');
  // v8 ignore next
  variant = input.required<FooterVariant>();
  // v8 ignore next
  agencyInfo = input<FooterAgencyInfo>();
  // v8 ignore next
  socials = input<FooterSocialLinks>();
  // v8 ignore next
  links = input<FooterLink[]>([]);

  /* For the big variant footer */
  // v8 ignore next
  linkColumns = input<FooterLinkColumn[]>([]);
  // v8 ignore next
  signUpFormInfo = input<FooterForm>();
  // Below are internally managed for the form
  formSubmit = output<string>();
  formState = signal<FooterFormState>('default');
  formErrors = signal<ValidationError[]>([]);
  formAnnouncement = signal<string>('');
  signUpModel = signal({ email: '' });
  signUpForm = form(this.signUpModel, (schemaPath) => {
    email(schemaPath.email, { message: "Email address is missing an '@' sign." });
  });

  ngAfterViewInit(): void {
    footer?.on();
  }

  /* Form submission - sets form's state, passes email to parent, and resets email field */
  onSubmit(event: Event) {
    event.preventDefault();

    const email = this.signUpForm.email().value();
    const customErrorMsg = this.signUpFormInfo()?.errorMessage;

    // Error for empty field
    if (email == '') {
      this.formState.set('error');
      this.formErrors.set([{ kind: 'empty', message: 'Email field cannot be empty.' }]);
      this.signUpForm.email().focusBoundControl();
      return;
    }

    // Error for invalid email
    if (this.signUpForm().invalid()) {
      this.formState.set('error');

      // Use custom error if provided; otherwise, use hard-coded email error
      if (customErrorMsg) {
        this.formErrors.set([{ kind: 'email', message: customErrorMsg }]);
      } else {
        this.formErrors.set(this.signUpForm.email().errors());
      }

      this.signUpForm.email().focusBoundControl();
      return;
    }

    // Otherwise, set success state
    this.formSubmit.emit(email);
    this.formState.set('success');
    this.signUpForm.email().value.set('');
    this.formErrors.set([]);

    // Clear then set the message again so screen readers
    // re-announce even if the message is unchanged
    this.formAnnouncement.set('');
    setTimeout(() => this.formAnnouncement.set(this.signUpSuccessMsg()), 150);
  }

  /* Footer variant selection function */
  // v8 ignore next
  footerVariantCss = computed(() => this.footerVariantCssFn());
  footerVariantCssFn = () => {
    const variant = this.variant();
    switch (variant) {
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

  /* Display the footer item if defined */
  // v8 ignore next
  agencyName = computed(() => this.agencyInfo()?.name);
  // v8 ignore next
  agencyLogoImagePath = computed(() => this.agencyInfo()?.logoImagePath);
  // v8 ignore next
  agencyLogoAlt = computed(() => this.agencyLogoAltFn());
  agencyLogoAltFn = () => {
    const logoAlt = this.agencyInfo()?.logoAlt;
    if (!logoAlt) return '';
    return logoAlt;
  };
  // v8 ignore next
  agencyContactHeading = computed(() => this.agencyInfo()?.contactHeading);
  // v8 ignore next
  agencyPhone = computed(() => this.agencyInfo()?.phone);
  // v8 ignore next
  agencyPhoneLabel = computed(() => this.agencyPhoneLabelFn());
  agencyPhoneLabelFn = () => {
    const phoneLabel = this.agencyInfo()?.phoneLabel;
    if (!phoneLabel) return this.agencyPhone();
    return phoneLabel;
  };
  // v8 ignore next
  agencyEmail = computed(() => this.agencyInfo()?.email);

  /* Sign up form items for the big footer */
  // v8 ignore next
  signUpHeading = computed(() => this.signUpHeadingFn());
  signUpHeadingFn = () => {
    const heading = this.signUpFormInfo()?.heading;
    if (!heading) return 'Sign up';
    return heading;
  };
  // v8 ignore next
  signUpInputLabel = computed(() => this.signUpInputLabelFn());
  signUpInputLabelFn = () => {
    const label = this.signUpFormInfo()?.label;
    if (!label) return 'Your email address';
    return label;
  };
  // v8 ignore next
  signUpInputId = computed(() => this.signUpInputIdFn());
  signUpInputIdFn = () => {
    const id = this.signUpFormInfo()?.inputId;
    if (!id) return 'sign-up-input-footer';
    return id;
  };
  // v8 ignore next
  signUpInputWidth = computed(() => this.signUpFormInfo()?.inputWidth);
  // v8 ignore next
  signUpInputHint = computed(() => this.signUpFormInfo()?.inputHint);
  // v8 ignore next
  signUpButtonText = computed(() => this.signUpButtonTextFn());
  signUpButtonTextFn = () => {
    const btnText = this.signUpFormInfo()?.buttonText;
    if (!btnText) return 'Sign up';
    return btnText;
  };
  // v8 ignore next
  signUpButtonStyle = computed(() => this.signUpButtonStyleFn());
  signUpButtonStyleFn = () => {
    const btnStyle = this.signUpFormInfo()?.buttonStyle;
    if (!btnStyle) return 'Default';
    return btnStyle;
  };
  // v8 ignore next
  signUpSuccessMsg = computed(() => this.signUpSuccessMsgFn());
  signUpSuccessMsgFn = () => {
    const msg = this.signUpFormInfo()?.successMessage;
    if (!msg) return "Sent! You're signed up for newsletters.";
    return msg;
  };
  // Toggle error container, label, and message when email field is invalid/valid
  // v8 ignore next
  showError = computed(() => this.showErrorFn());
  showErrorFn = () => {
    if (this.formState() === 'error') return true;
    return false;
  };

  // Toggle text input error/success state when email field is invalid/valid
  // v8 ignore next
  inputState = computed(() => this.inputStateFn());
  inputStateFn = (): TextInputState | undefined => {
    const state = this.formState();
    if (state == 'success') {
      return 'success';
    } else if (state == 'error') {
      return 'error';
    }
    return undefined;
  };

  /* Display the social media link if defined */
  // v8 ignore next
  facebookLink = computed(() => this.socials()?.facebook);
  // v8 ignore next
  twitterLink = computed(() => this.socials()?.twitter);
  // v8 ignore next
  youtubeLink = computed(() => this.socials()?.youtube);
  // v8 ignore next
  instagramLink = computed(() => this.socials()?.instagram);
  // v8 ignore next
  rssLink = computed(() => this.socials()?.rss);

  /* Compute icon paths for social media links */
  // v8 ignore next
  facebookIconPath = computed(() => `${this.iconsPath()}/facebook.svg`);
  // v8 ignore next
  twitterIconPath = computed(() => `${this.iconsPath()}/twitter.svg`);
  // v8 ignore next
  youtubeIconPath = computed(() => `${this.iconsPath()}/youtube.svg`);
  // v8 ignore next
  instagramIconPath = computed(() => `${this.iconsPath()}/instagram.svg`);
  // v8 ignore next
  rssFeedIconPath = computed(() => `${this.iconsPath()}/rss_feed.svg`);
}
