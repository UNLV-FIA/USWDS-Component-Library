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
 * @input {FooterLinkColumn[]} [linkColumns=[]] - A list of columns of links to display in the 'big' footer.
 *   Each item requires a 'topic' and `links` for the column. Each link requires a 'label' and 'href'.
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
  signUpForm = input<SignUpForm>();

  // For the big variant footer
  formSubmit = output<string>(); // the function you want ran
  userEmail = '';
  linkColumns = input<FooterLinkColumn[]>([]); // for the big variant only

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

  // Assign default values for footer items
  agencyName = computed(() => this.agencyInfo()?.name ?? null);
  agencyLogoImagePath = computed(() => this.agencyInfo()?.logoImagePath ?? null);
  btnText = computed(() => this.signUpForm()?.buttonText ?? 'Sign Up');

  // Compute icon paths for social media links
  facebookIconPath = computed(() => `${this.iconsPath()}/facebook.svg`);
  twitterIconPath = computed(() => `${this.iconsPath()}/twitter.svg`);
  youtubeIconPath = computed(() => `${this.iconsPath()}/youtube.svg`);
  instagramIconPath = computed(() => `${this.iconsPath()}/instagram.svg`);
  rssFeedIconPath = computed(() => `${this.iconsPath()}/rss_feed.svg`);
}
