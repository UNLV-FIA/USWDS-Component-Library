import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './ngx-uswds-component-banner-lib';

describe('BannerComponent', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BannerComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should default to .gov domain', () => {
        expect(component.tld).toBe('gov');
    });

    it('should default to English language', () => {
        expect(component.lang).toBe('en');
    });

    it('should start with collapsed accordion', () => {
        expect(component.isExpanded).toBe(false);
    });

    it('should toggle accordion when button is clicked', () => {
        expect(component.isExpanded).toBe(false);
        component.toggleAccordion();
        expect(component.isExpanded).toBe(true);
        component.toggleAccordion();
        expect(component.isExpanded).toBe(false);
    });

    describe('.gov domain - English', () => {
        beforeEach(() => {
            component.tld = 'gov';
            component.lang = 'en';
        });

        it('should display correct header text', () => {
            expect(component.headerText).toBe('An official website of the United States government');
        });

        it('should display correct button text', () => {
            expect(component.buttonText).toBe('Here’s how you know');
        });

        it('should display correct domain label', () => {
            expect(component.domainLabel).toBe('Official websites use .gov');
        });

        it('should display correct domain description', () => {
            expect(component.domainDescription).toBe(
                'A .gov website belongs to an official government organization in the United States.'
            );
        });

        it('should display correct secure label', () => {
            expect(component.secureLabel).toBe('Secure .gov websites use HTTPS');
        });

        it('should display correct secure description', () => {
            expect(component.secureDescription).toBe('A lock (LOCK.SVG) or https:// means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.');
        });
    });

    describe('.mil domain - English', () => {
        beforeEach(() => {
            component.tld = 'mil';
            component.lang = 'en';
        });

        it('should display correct header text', () => {
            expect(component.headerText).toBe('An official website of the United States government');
        });

        it('should display correct button text', () => {
            expect(component.buttonText).toBe('Here’s how you know');
        });

        it('should display correct domain label', () => {
            expect(component.domainLabel).toBe('Official websites use .mil');
        });

        it('should display correct domain description', () => {
            expect(component.domainDescription).toBe(
                'A .mil website belongs to an official U.S. Department of Defense organization.'
            );
        });

        it('should display correct secure label', () => {
            expect(component.secureLabel).toBe('Secure .mil websites use HTTPS');
        });

        it('should display correct secure description', () => {
            expect(component.secureDescription).toBe('A lock (LOCK.SVG) or https:// means you’ve safely connected to the .mil website. Share sensitive information only on official, secure websites.');
        });
    });

    describe('.gov domain - Spanish', () => {
        beforeEach(() => {
            component.tld = 'gov';
            component.lang = 'es';
        });

        it('should display correct header text', () => {
            expect(component.headerText).toBe('Un sitio oficial del Gobierno de Estados Unidos');
        });

        it('should display correct button text', () => {
            expect(component.buttonText).toBe('Así es como usted puede verificarlo');
        });

        it('should display correct domain label', () => {
            expect(component.domainLabel).toBe('Los sitios web oficiales usan .gov');
        });

        it('should display correct domain description', () => {
            expect(component.domainDescription).toBe(
                'Un sitio web .gov pertenece a una organización oficial del Gobierno de Estados Unidos.'
            );
        });

        it('should display correct secure label', () => {
            expect(component.secureLabel).toBe('Los sitios web seguros .gov usan HTTPS');
        });

        it('should display correct secure description', () => {
            expect(component.secureDescription).toBe('Un candado (LOCK.SVG) o https:// significa que usted se conectó de forma segura a un sitio web .gov. Comparta información sensible sólo en sitios web oficiales y seguros.');
        });
    });

    describe('.mil domain - Spanish', () => {
        beforeEach(() => {
            component.tld = 'mil';
            component.lang = 'es';
        });
        it('should display correct header text', () => {
            expect(component.headerText).toBe('Un sitio oficial del Gobierno de Estados Unidos');
        });

        it('should display correct button text', () => {
            expect(component.buttonText).toBe('Así es como usted puede verificarlo');
        });

        it('should display correct domain label', () => {
            expect(component.domainLabel).toBe('Los sitios web oficiales usan .mil');
        });

        it('should display correct domain description', () => {
            expect(component.domainDescription).toBe(
                'Un sitio web .mil pertenece a una organización oficial del Departamento de Defensa de EE. UU.'
            );
        });

        it('should display correct secure label', () => {
            expect(component.secureLabel).toBe('Los sitios web seguros .mil usan HTTPS');
        });

        it('should display correct secure description', () => {
            expect(component.secureDescription).toBe('Un candado (LOCK.SVG) o https:// significa que usted se conectó de forma segura a un sitio web .mil. Comparta información sensible sólo en sitios web oficiales y seguros.');
        });
    });


    describe('Computed properties', () => {
    it('should use custom aria-label if provided', () => {
      component.ariaLabel = 'Custom label';
      expect(component.computedAriaLabel).toBe('Custom label');
    });

    it('should use default English aria-label', () => {
      component.lang = 'en';
      expect(component.computedAriaLabel).toBe('Official website of the United States government');
    });

    it('should use default Spanish aria-label', () => {
      component.lang = 'es';
      expect(component.computedAriaLabel).toBe('Un sitio oficial del Gobierno de Estados Unidos');
    });

    it('should generate correct accordion ID for .gov English', () => {
      component.tld = 'gov';
      component.lang = 'en';
      expect(component.computedAccordionId).toBe('gov-banner');
    });

    it('should generate correct accordion ID for .mil English', () => {
      component.tld = 'mil';
      component.lang = 'en';
      expect(component.computedAccordionId).toBe('gov-banner-dot-mil');
    });

    it('should generate correct accordion ID for .gov Spanish', () => {
      component.tld = 'gov';
      component.lang = 'es';
      expect(component.computedAccordionId).toBe('gov-banner-lang-es');
    });

    it('should generate correct accordion ID for .mil Spanish', () => {
      component.tld = 'mil';
      component.lang = 'es';
      expect(component.computedAccordionId).toBe('gov-banner-dot-mil-lang-es');
    });

    it('should use custom accordion ID if provided', () => {
      component.accordionId = 'custom-id';
      expect(component.computedAccordionId).toBe('custom-id');
    });

    it('should use default assets path', () => {
      expect(component.assetsPath).toBe('/assets/img');
    });

    it('should generate correct flag image path', () => {
      expect(component.flagImagePath).toBe('/assets/img/us_flag_small.png');
    });

    it('should generate correct dot-gov icon path', () => {
      expect(component.dotGovIconPath).toBe('/assets/img/icon-dot-gov.svg');
    });

    it('should generate correct https icon path', () => {
      expect(component.httpsIconPath).toBe('/assets/img/icon-https.svg');
    });

    it('should use custom assets path', () => {
      component.assetsPath = '/custom/path';
      expect(component.flagImagePath).toBe('/custom/path/us_flag_small.png');
      expect(component.dotGovIconPath).toBe('/custom/path/icon-dot-gov.svg');
      expect(component.httpsIconPath).toBe('/custom/path/icon-https.svg');
    });
  });

  describe('DOM rendering', () => {
    it('should render banner section', () => {
      const compiled = fixture.nativeElement;
      const banner = compiled.querySelector('.usa-banner');
      expect(banner).toBeTruthy();
    });

    it('should render accordion button', () => {
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('.usa-accordion__button');
      expect(button).toBeTruthy();
    });

    it('should update aria-expanded when toggled', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('.usa-accordion__button');
      
      expect(button.getAttribute('aria-expanded')).toBe('false');
      
      component.toggleAccordion();
      fixture.detectChanges();
      
      expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('should show/hide content when toggled', () => {
      fixture.detectChanges();
      const content = fixture.nativeElement.querySelector('.usa-banner__content');
      
      expect(content.hidden).toBe(true);
      
      component.toggleAccordion();
      fixture.detectChanges();
      
      expect(content.hidden).toBe(false);
    });

    it('should render flag image', () => {
      const compiled = fixture.nativeElement;
      const flag = compiled.querySelector('.usa-banner__header-flag');
      expect(flag).toBeTruthy();
      expect(flag.getAttribute('aria-hidden')).toBe('true');
    });

    it('should render guidance images', () => {
      component.isExpanded = true;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const icons = compiled.querySelectorAll('.usa-banner__icon');
      expect(icons.length).toBe(2);
    });

    it('should render lock SVG with proper accessibility attributes', () => {
      component.isExpanded = true;
      fixture.detectChanges();
      
      const svg = fixture.nativeElement.querySelector('.usa-banner__lock-image');
      expect(svg).toBeTruthy();
      expect(svg.getAttribute('role')).toBe('img');
      expect(svg.getAttribute('focusable')).toBe('false');
    });

    it('should set correct accordion ID on content', () => {
      component.tld = 'mil';
      component.lang = 'es';
      fixture.detectChanges();
      
      const content = fixture.nativeElement.querySelector('.usa-banner__content');
      expect(content.id).toBe('gov-banner-dot-mil-lang-es');
    });
  });
});