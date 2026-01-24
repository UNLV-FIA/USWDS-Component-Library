import { Component, Input } from '@angular/core';
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
  selector: 'uswds-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-uswds-component-banner-lib.html',
  styleUrls: ['./ngx-uswds-component-banner-lib.scss']
})
export class USWDSBanner {
  @Input() ariaLabel?: string;
  @Input() tld: DomainType = 'gov';
  @Input() lang: LanguageType = 'en';
  @Input() accordionId?: string;
  @Input() assetsPath: string = '/assets/img';
  
  isExpanded: boolean = false;

  toggleAccordion(): void {
    this.isExpanded = !this.isExpanded;
  }

  get computedAriaLabel(): string {
    if (this.ariaLabel) return this.ariaLabel;
    return BANNER_CONTENT[this.lang][this.tld].header;
  }

  get computedAccordionId(): string {
    if (this.accordionId) return this.accordionId;
    const langSuffix = this.lang === 'es' ? '-lang-es' : '';
    const tldSuffix = this.tld === 'mil' ? '-dot-mil' : '';
    return `gov-banner${tldSuffix}${langSuffix}`;
  }

  get lockIconId(): string {
    const langSuffix = this.lang === 'es' ? '-spanish' : '';
    const tldSuffix = this.tld === 'mil' ? '-dot-mil' : '-default';
    return `banner-lock${tldSuffix}${langSuffix}`;
  }

  get headerText(): string {
    return BANNER_CONTENT[this.lang][this.tld].header;
  }

  get buttonText(): string {
    return BANNER_CONTENT[this.lang][this.tld].button;
  }

  get domainLabel(): string {
    return BANNER_CONTENT[this.lang][this.tld].domainLabel;
  }

  get domainDescription(): string {
    return BANNER_CONTENT[this.lang][this.tld].domainDescription;
  }

  get secureLabel(): string {
    return BANNER_CONTENT[this.lang][this.tld].secureLabel;
  }

  get secureDescription(): string {
    return BANNER_CONTENT[this.lang][this.tld].secureDescription;
  }

  get domainStrong(): string {
    return `.${this.tld}`;
  }

  get lockWord(): string {
    return this.lang === 'es' ? 'candado' : 'lock';
  }

  get flagImagePath(): string {
    return `${this.assetsPath}/us_flag_small.png`;
  }

  get dotGovIconPath(): string {
    return `${this.assetsPath}/icon-dot-gov.svg`;
  }

  get httpsIconPath(): string {
    return `${this.assetsPath}/icon-https.svg`;
  }
}