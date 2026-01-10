// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';

// type DomainType = 'gov' | 'mil';
// type LanguageType = 'en' | 'es';

// @Component({
//   selector: 'uswds-banner',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './ngx-uswds-component-banner-lib.html',
//   styleUrls: ['./ngx-uswds-component-banner-lib.css']
// })
// export class BannerComponent {
//   @Input() ariaLabel?: string;
//   @Input() tld: DomainType = 'gov';
//   @Input() lang: LanguageType = 'en';
//   @Input() accordionId?: string;
//   @Input() assetsPath: string = '/assets/img';
  
//   isExpanded: boolean = false;

//   toggleAccordion(): void {
//     this.isExpanded = !this.isExpanded;
//   }

//   get computedAriaLabel(): string {
//     if (this.ariaLabel) return this.ariaLabel;
//     return this.lang === 'es' 
//       ? 'Un sitio oficial del Gobierno de Estados Unidos'
//       : 'Official website of the United States government';
//   }

//   get computedAccordionId(): string {
//     if (this.accordionId) return this.accordionId;
//     const langSuffix = this.lang === 'es' ? '-lang-es' : '';
//     const tldSuffix = this.tld === 'mil' ? '-dot-mil' : '';
//     return 'gov-banner${tldSuffix}${langSuffix}';
//   }

//   get lockIconId(): string {
//     const langSuffix = this.lang === 'es' ? '-spanish' : '';
//     const tldSuffix = this.tld === 'mil' ? '-dot-mil' : '-default';
//     return 'banner-lock${tldSuffix}${langSuffix}';
//   }

//   get headerText(): string {
//     return this.lang === 'es'
//       ? 'Un sitio oficial del Gobierno de Estados Unidos'
//       : 'An official website of the United States government';
//   }

//   get buttonText(): string {
//     return this.lang === 'es'
//       ? 'Así es como usted puede verificarlo'
//       : 'Here’s how you know';
//   }

//   get domainLabel(): string {
//     if (this.lang === 'es') {
//       return this.tld === 'mil' 
//         ? 'Los sitios web oficiales usan .mil'
//         : 'Los sitios web oficiales usan .gov';
//     }
//     return this.tld === 'mil'
//       ? 'Official websites use .mil'
//       : 'Official websites use .gov';
//   }

//   get domainDescription(): string {
//     if (this.lang === 'es') {
//       return this.tld === 'mil'
//         ? 'Un sitio web .mil pertenece a una organización oficial del Departamento de Defensa de EE. UU.'
//         : 'Un sitio web .gov pertenece a una organización oficial del Gobierno de Estados Unidos.';
//     }
//     return this.tld === 'mil'
//       ? 'A .mil website belongs to an official U.S. Department of Defense organization.'
//       : 'A .gov website belongs to an official government organization in the United States.';
//   }

//   get secureLabel(): string {
//     if (this.lang === 'es') {
//       return this.tld === 'mil'
//         ? 'Los sitios web seguros .mil usan HTTPS'
//         : 'Los sitios web seguros .gov usan HTTPS';
//     }
//     return this.tld === 'mil'
//       ? 'Secure .mil websites use HTTPS'
//       : 'Secure .gov websites use HTTPS';
//   }

//   get secureDescription(): string {
//     const domain = '.${this.tld}';
//     if (this.lang === 'es') {
//       return 'Un candado (LOCK.SVG) o https:// significa que usted se conectó de forma segura a un sitio web ${domain}. Comparta información sensible sólo en sitios web oficiales y seguros.';
//     }
//     return 'A lock (LOCK.SVG) or https:// means you’ve safely connected to the ${domain} website. Share sensitive information only on official, secure websites.';
//   }

//   get domainStrong(): string {
//     return '.${this.tld}';
//   }

//   get lockWord(): string {
//     return this.lang === 'es' ? 'candado' : 'lock';
//   }

//   get flagImagePath(): string {
//     return '${this.assetsPath}/us_flag_small.png';
//   }

//   get dotGovIconPath(): string {
//     return '${this.assetsPath}/icon-dot-gov.svg';
//   }

//   get httpsIconPath(): string {
//     return '${this.assetsPath}/icon-https.svg';
//   }
// }

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type DomainType = 'gov' | 'mil';
type LanguageType = 'en' | 'es';

@Component({
  selector: 'uswds-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-uswds-component-banner-lib.html',
  styleUrls: ['./ngx-uswds-component-banner-lib.css']
})
export class BannerComponent {
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
    return this.lang === 'es' 
      ? 'Un sitio oficial del Gobierno de Estados Unidos'
      : 'Official website of the United States government';
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
    return this.lang === 'es'
      ? 'Un sitio oficial del Gobierno de Estados Unidos'
      : 'An official website of the United States government';
  }

  get buttonText(): string {
    return this.lang === 'es'
      ? 'Así es como usted puede verificarlo'
      : 'Here’s how you know';
  }

  get domainLabel(): string {
    if (this.lang === 'es') {
      return this.tld === 'mil' 
        ? 'Los sitios web oficiales usan .mil'
        : 'Los sitios web oficiales usan .gov';
    }
    return this.tld === 'mil'
      ? 'Official websites use .mil'
      : 'Official websites use .gov';
  }

  get domainDescription(): string {
    if (this.lang === 'es') {
      return this.tld === 'mil'
        ? 'Un sitio web .mil pertenece a una organización oficial del Departamento de Defensa de EE. UU.'
        : 'Un sitio web .gov pertenece a una organización oficial del Gobierno de Estados Unidos.';
    }
    return this.tld === 'mil'
      ? 'A .mil website belongs to an official U.S. Department of Defense organization.'
      : 'A .gov website belongs to an official government organization in the United States.';
  }

  get secureLabel(): string {
    if (this.lang === 'es') {
      return this.tld === 'mil'
        ? 'Los sitios web seguros .mil usan HTTPS'
        : 'Los sitios web seguros .gov usan HTTPS';
    }
    return this.tld === 'mil'
      ? 'Secure .mil websites use HTTPS'
      : 'Secure .gov websites use HTTPS';
  }

  get secureDescription(): string {
    const domain = `.${this.tld}`;
    if (this.lang === 'es') {
      return `Un candado (LOCK.SVG) o https:// significa que usted se conectó de forma segura a un sitio web ${domain}. Comparta información sensible sólo en sitios web oficiales y seguros.`;
    }
    return `A lock (LOCK.SVG) or https:// means you've safely connected to the ${domain} website. Share sensitive information only on official, secure websites.`;
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