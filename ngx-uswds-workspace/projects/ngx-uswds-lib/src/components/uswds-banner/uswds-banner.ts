import { Component, input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BANNER_CONTENT, DomainType, LanguageType } from './banner-content';

/**
 * @class USWDSBanner
 * @description
 * An Angular standalone component that renders the official U.S. Web Design System (USWDS) banner.
 * Banners identify official websites of government organizations in the United States.
 * They also help visitors understand whether a website is official and secure.
 *
 * @selector uswds-banner

 * @example
 * // Spanish language with .mil domain
 * <uswds-banner lang="es" tld="mil"></uswds-banner>
 *
 * @input {string} [ariaLabel] - Custom aria-label for the banner region. If not provided,
 *   defaults to the localized header text based on language and domain settings.
 *
 * @input {DomainType} [tld='gov'] - The top-level domain type for the banner content.
 *   Accepts 'gov' for government sites or 'mil' for military sites.
 *
 * @input {LanguageType} [lang='en'] - The language for banner content.
 *   Accepts 'en' for English or 'es' for Spanish.
 *
 * @input {string} [accordionId] - Custom ID for the accordion element. If not provided,
 *   an ID is auto-generated based on language and domain settings.
 *
 * @input {string} [assetsPath='/assets/img'] - Base path to the banner image assets.
 *   Useful when assets are hosted in a different location.
 */
@Component({
  selector: 'ngx-uswds-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uswds-banner.html',
  styleUrl: './uswds-banner.scss'
})
export class UswdsBanner {
  ariaLabel = input<string>();
  tld = input<DomainType>('gov');
  lang = input<LanguageType>('en');
  accordionId = input<string>();
  assetsPath = input<string>('/assets/img');

  isExpanded = signal(false);

  toggleAccordion(): void {
    this.isExpanded.update(v => !v);
  }

  computedAriaLabel = computed(() => {
    const label = this.ariaLabel();
    if (label) return label;
    return BANNER_CONTENT[this.lang()][this.tld()].header;
  });

  computedAccordionId = computed(() => {
    const id = this.accordionId();
    if (id) return id;
    const langSuffix = this.lang() === 'es' ? '-lang-es' : '';
    const tldSuffix = this.tld() === 'mil' ? '-dot-mil' : '';
    return `gov-banner${tldSuffix}${langSuffix}`;
  });

  lockIconId = computed(() => {
    const langSuffix = this.lang() === 'es' ? '-spanish' : '';
    const tldSuffix = this.tld() === 'mil' ? '-dot-mil' : '-default';
    return `banner-lock${tldSuffix}${langSuffix}`;
  });

  headerText = computed(() => BANNER_CONTENT[this.lang()][this.tld()].header);
  buttonText = computed(() => BANNER_CONTENT[this.lang()][this.tld()].button);
  domainLabel = computed(() => BANNER_CONTENT[this.lang()][this.tld()].domainLabel);
  domainDescription = computed(() => BANNER_CONTENT[this.lang()][this.tld()].domainDescription);
  secureLabel = computed(() => BANNER_CONTENT[this.lang()][this.tld()].secureLabel);
  secureDescription = computed(() => BANNER_CONTENT[this.lang()][this.tld()].secureDescription);
  domainStrong = computed(() => `.${this.tld()}`);
  lockWord = computed(() => this.lang() === 'es' ? 'candado' : 'lock');
  flagImagePath = computed(() => `${this.assetsPath()}/us_flag_small.png`);
  dotGovIconPath = computed(() => `${this.assetsPath()}/icon-dot-gov.svg`);
  httpsIconPath = computed(() => `${this.assetsPath()}/icon-https.svg`);
}