import { Component, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { FooterVariant } from './footer-types';
import { footer } from '@uswds/uswds/js';

@Component({
  selector: 'ngx-uswds-footer',
  imports: [NgClass],
  templateUrl: './uswds-footer.html',
  styleUrl: './uswds-footer.scss',
})
export class UswdsFooter {
  variant = input<FooterVariant>();
  assetsPath = input<string>('/assets/img');
  agency = input<string>();
  logoImagePath = input<string>();
  // pass buttonStyle, clicked event, need output

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
    } // compile component, check if fixed
  };

  defaultLogoImagePath = computed(() => `${this.assetsPath()}/logo-img.png`);
  facebookImagePath = computed(() => `${this.assetsPath()}/usa-icons/facebook.svg`);
  twitterImagePath = computed(() => `${this.assetsPath()}/usa-icons/twitter.svg`);
  youtubeImagePath = computed(() => `${this.assetsPath()}/usa-icons/youtube.svg`);
  instagramImagePath = computed(() => `${this.assetsPath()}/usa-icons/instagram.svg`);
  rssFeedImagePath = computed(() => `${this.assetsPath()}/usa-icons/rss_feed.svg`);
}
