export type DomainType = 'gov' | 'mil';
export type LanguageType = 'en' | 'es';

interface BannerText {
  header: string;
  button: string;
  domainLabel: string;
  domainDescription: string;
  secureLabel: string;
  secureDescription: string;
}

type BannerContentType = {
  [lang in LanguageType]: {
    [domain in DomainType]: BannerText;
  };
};
// Comment

export const BANNER_CONTENT: BannerContentType = {
  en: {
    gov: {
      header: 'An official website of the United States government',
      button: 'Here’s how you know',
      domainLabel: 'Official websites use .gov',
      domainDescription:
        'A .gov website belongs to an official government organization in the United States.',
      secureLabel: 'Secure .gov websites use HTTPS',
      secureDescription:
        'A lock (LOCK.SVG) or https:// means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.',
    },
    mil: {
      header: 'An official website of the United States government',
      button: 'Here’s how you know',
      domainLabel: 'Official websites use .mil',
      domainDescription:
        'A .mil website belongs to an official U.S. Department of Defense organization.',
      secureLabel: 'Secure .mil websites use HTTPS',
      secureDescription:
        'A lock (LOCK.SVG) or https:// means you’ve safely connected to the .mil website. Share sensitive information only on official, secure websites.',
    },
  },
  es: {
    gov: {
      header: 'Un sitio oficial del Gobierno de Estados Unidos',
      button: 'Así es como usted puede verificarlo',
      domainLabel: 'Los sitios web oficiales usan .gov',
      domainDescription:
        'Un sitio web .gov pertenece a una organización oficial del Gobierno de Estados Unidos.',
      secureLabel: 'Los sitios web seguros .gov usan HTTPS',
      secureDescription:
        'Un candado (LOCK.SVG) o https:// significa que usted se conectó de forma segura a un sitio web .gov. Comparta información sensible sólo en sitios web oficiales y seguros.',
    },
    mil: {
      header: 'Un sitio oficial del Gobierno de Estados Unidos',
      button: 'Así es como usted puede verificarlo',
      domainLabel: 'Los sitios web oficiales usan .mil',
      domainDescription:
        'Un sitio web .mil pertenece a una organización oficial del Departamento de Defensa de EE. UU.',
      secureLabel: 'Los sitios web seguros .mil usan HTTPS',
      secureDescription:
        'Un candado (LOCK.SVG) o https:// significa que usted se conectó de forma segura a un sitio web .mil. Comparta información sensible sólo en sitios web oficiales y seguros.',
    },
  },
};
