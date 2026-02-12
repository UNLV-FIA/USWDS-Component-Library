import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsBanner } from './uswds-banner';
import { BANNER_CONTENT, DomainType, LanguageType } from './banner-content';

@Component({
  standalone: true,
  imports: [UswdsBanner],
  template: `
    <ngx-uswds-banner
      [tld]="tld"
      [lang]="lang"
      [ariaLabel]="ariaLabel"
      [accordionId]="accordionId"
      [assetsPath]="assetsPath"
    ></ngx-uswds-banner>
  `,
})
class TestHostComponent {
  tld: DomainType = 'gov';
  lang: LanguageType = 'en';
  ariaLabel?: string;
  accordionId?: string;
  assetsPath = '/assets/img';
}

describe('UswdsBanner', () => {
  let component: UswdsBanner;
  let fixture: ComponentFixture<UswdsBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to .gov domain', () => {
    expect(component.tld()).toBe('gov');
  });

  it('should default to English language', () => {
    expect(component.lang()).toBe('en');
  });

  it('should start with collapsed accordion', () => {
    expect(component.isExpanded()).toBe(false);
  });

  it('should toggle accordion when button is clicked', () => {
    expect(component.isExpanded()).toBe(false);
    component.toggleAccordion();
    expect(component.isExpanded()).toBe(true);
    component.toggleAccordion();
    expect(component.isExpanded()).toBe(false);
  });

  describe('Text content for different configurations', () => {
    const testCases = [
      {
        tld: 'gov' as const,
        lang: 'en' as const,
        description: '.gov domain - English',
      },
      {
        tld: 'mil' as const,
        lang: 'en' as const,
        description: '.mil domain - English',
      },
      {
        tld: 'gov' as const,
        lang: 'es' as const,
        description: '.gov domain - Spanish',
      },
      {
        tld: 'mil' as const,
        lang: 'es' as const,
        description: '.mil domain - Spanish',
      },
    ];

    testCases.forEach(({ tld, lang, description }) => {
      describe(description, () => {
        beforeEach(() => {
          fixture.componentRef.setInput('tld', tld);
          fixture.componentRef.setInput('lang', lang);
          fixture.detectChanges();
        });

        it('should display correct header text', () => {
          expect(component.headerText()).toBe(BANNER_CONTENT[lang][tld].header);
        });

        it('should display correct button text', () => {
          expect(component.buttonText()).toBe(BANNER_CONTENT[lang][tld].button);
        });

        it('should display correct domain label', () => {
          expect(component.domainLabel()).toBe(BANNER_CONTENT[lang][tld].domainLabel);
        });

        it('should display correct domain description', () => {
          expect(component.domainDescription()).toBe(BANNER_CONTENT[lang][tld].domainDescription);
        });

        it('should display correct secure label', () => {
          expect(component.secureLabel()).toBe(BANNER_CONTENT[lang][tld].secureLabel);
        });

        it('should display correct secure description', () => {
          expect(component.secureDescription()).toBe(BANNER_CONTENT[lang][tld].secureDescription);
        });
      });
    });
  });

  describe('Computed properties', () => {
    it('should use custom aria-label if provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom label');
      fixture.detectChanges();
      expect(component.computedAriaLabel()).toBe('Custom label');
    });

    it('should use default English aria-label', () => {
      fixture.componentRef.setInput('lang', 'en');
      fixture.detectChanges();
      expect(component.computedAriaLabel()).toBe(BANNER_CONTENT.en[component.tld()].header);
    });

    it('should use default Spanish aria-label', () => {
      fixture.componentRef.setInput('lang', 'es');
      fixture.detectChanges();
      expect(component.computedAriaLabel()).toBe(BANNER_CONTENT.es[component.tld()].header);
    });

    const accordionIdTestCases = [
      { tld: 'gov' as const, lang: 'en' as const, expected: 'gov-banner' },
      { tld: 'mil' as const, lang: 'en' as const, expected: 'gov-banner-dot-mil' },
      { tld: 'gov' as const, lang: 'es' as const, expected: 'gov-banner-lang-es' },
      { tld: 'mil' as const, lang: 'es' as const, expected: 'gov-banner-dot-mil-lang-es' },
    ];

    accordionIdTestCases.forEach(({ tld, lang, expected }) => {
      it(`should generate correct accordion ID for .${tld} ${lang === 'en' ? 'English' : 'Spanish'}`, () => {
        fixture.componentRef.setInput('tld', tld);
        fixture.componentRef.setInput('lang', lang);
        fixture.detectChanges();
        expect(component.computedAccordionId()).toBe(expected);
      });
    });

    it('should use custom accordion ID if provided', () => {
      fixture.componentRef.setInput('accordionId', 'custom-id');
      fixture.detectChanges();
      expect(component.computedAccordionId()).toBe('custom-id');
    });

    it('should use default assets path', () => {
      expect(component.assetsPath()).toBe('/assets/img');
    });

    it('should generate correct flag image path', () => {
      expect(component.flagImagePath()).toBe('/assets/img/us_flag_small.png');
    });

    it('should generate correct dot-gov icon path', () => {
      expect(component.dotGovIconPath()).toBe('/assets/img/icon-dot-gov.svg');
    });

    it('should generate correct https icon path', () => {
      expect(component.httpsIconPath()).toBe('/assets/img/icon-https.svg');
    });

    it('should use custom assets path', () => {
      fixture.componentRef.setInput('assetsPath', '/custom/path');
      fixture.detectChanges();
      expect(component.flagImagePath()).toBe('/custom/path/us_flag_small.png');
      expect(component.dotGovIconPath()).toBe('/custom/path/icon-dot-gov.svg');
      expect(component.httpsIconPath()).toBe('/custom/path/icon-https.svg');
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
      const button = fixture.nativeElement.querySelector('.usa-accordion__button');

      expect(button.getAttribute('aria-expanded')).toBe('false');

      // Simulate button click to avoid change detection errors
      button.click();
      fixture.detectChanges();

      expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('should show/hide content when toggled', () => {
      const content = fixture.nativeElement.querySelector('.usa-banner__content');

      expect(content.hidden).toBe(true);

      // Simulate button click to avoid change detection errors
      const button = fixture.nativeElement.querySelector('.usa-accordion__button');
      button.click();
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
      // Create a fresh fixture with expanded state
      const testFixture = TestBed.createComponent(UswdsBanner);
      const testComponent = testFixture.componentInstance;
      testComponent.isExpanded.set(true);
      testFixture.detectChanges();

      const compiled = testFixture.nativeElement;
      const icons = compiled.querySelectorAll('.usa-banner__icon');
      expect(icons.length).toBe(2);
    });

    it('should render lock SVG with proper accessibility attributes', () => {
      // Create a fresh fixture with expanded state
      const testFixture = TestBed.createComponent(UswdsBanner);
      const testComponent = testFixture.componentInstance;
      testComponent.isExpanded.set(true);
      testFixture.detectChanges();

      const svg = testFixture.nativeElement.querySelector('.usa-banner__lock-image');
      expect(svg).toBeTruthy();
      expect(svg.getAttribute('role')).toBe('img');
      expect(svg.getAttribute('focusable')).toBe('false');
    });

    it('should set correct accordion ID on content', () => {
      // Create a fresh fixture to avoid change detection errors
      const testFixture = TestBed.createComponent(UswdsBanner);
      testFixture.componentRef.setInput('tld', 'mil');
      testFixture.componentRef.setInput('lang', 'es');
      testFixture.detectChanges();

      const content = testFixture.nativeElement.querySelector('.usa-banner__content');
      expect(content.id).toBe('gov-banner-dot-mil-lang-es');
    });

    it('should render expanded content for .mil English', () => {
      const testFixture = TestBed.createComponent(UswdsBanner);
      testFixture.componentRef.setInput('tld', 'mil');
      testFixture.componentRef.setInput('lang', 'en');
      testFixture.componentInstance.isExpanded.set(true);
      testFixture.detectChanges();

      const compiled = testFixture.nativeElement;
      expect(compiled.querySelector('.usa-banner__content').hidden).toBe(false);
      expect(compiled.textContent).toContain('.mil');
    });

    it('should render expanded content for .gov Spanish', () => {
      const testFixture = TestBed.createComponent(UswdsBanner);
      testFixture.componentRef.setInput('tld', 'gov');
      testFixture.componentRef.setInput('lang', 'es');
      testFixture.componentInstance.isExpanded.set(true);
      testFixture.detectChanges();

      const compiled = testFixture.nativeElement;
      expect(compiled.querySelector('.usa-banner__content').hidden).toBe(false);
      expect(compiled.textContent).toContain('.gov');
      expect(compiled.textContent).toContain('candado');
    });

    it('should render expanded content for .mil Spanish', () => {
      const testFixture = TestBed.createComponent(UswdsBanner);
      testFixture.componentRef.setInput('tld', 'mil');
      testFixture.componentRef.setInput('lang', 'es');
      testFixture.componentInstance.isExpanded.set(true);
      testFixture.detectChanges();

      const compiled = testFixture.nativeElement;
      expect(compiled.querySelector('.usa-banner__content').hidden).toBe(false);
      expect(compiled.textContent).toContain('.mil');
      expect(compiled.textContent).toContain('candado');
    });
  });

  describe('Computed property branches', () => {
    it('should generate correct lockIconId for all lang/tld combinations', () => {
      fixture.componentRef.setInput('tld', 'gov');
      fixture.componentRef.setInput('lang', 'en');
      fixture.detectChanges();
      expect(component.lockIconId()).toBe('banner-lock-default');

      fixture.componentRef.setInput('tld', 'mil');
      fixture.componentRef.setInput('lang', 'en');
      fixture.detectChanges();
      expect(component.lockIconId()).toBe('banner-lock-dot-mil');

      fixture.componentRef.setInput('tld', 'gov');
      fixture.componentRef.setInput('lang', 'es');
      fixture.detectChanges();
      expect(component.lockIconId()).toBe('banner-lock-default-spanish');

      fixture.componentRef.setInput('tld', 'mil');
      fixture.componentRef.setInput('lang', 'es');
      fixture.detectChanges();
      expect(component.lockIconId()).toBe('banner-lock-dot-mil-spanish');
    });

    it('should return correct domainStrong for each tld', () => {
      fixture.componentRef.setInput('tld', 'gov');
      fixture.detectChanges();
      expect(component.domainStrong()).toBe('.gov');

      fixture.componentRef.setInput('tld', 'mil');
      fixture.detectChanges();
      expect(component.domainStrong()).toBe('.mil');
    });

    it('should return correct lockWord for each language', () => {
      fixture.componentRef.setInput('lang', 'en');
      fixture.detectChanges();
      expect(component.lockWord()).toBe('lock');

      fixture.componentRef.setInput('lang', 'es');
      fixture.detectChanges();
      expect(component.lockWord()).toBe('candado');
    });
  });
});

describe('UswdsBanner via template bindings', () => {
  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
  });

  it('should render with default inputs via template binding', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const banner = hostFixture.nativeElement.querySelector('.usa-banner');
    expect(banner).toBeTruthy();
  });

  it('should render with .mil Spanish inputs via template binding', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.componentInstance.tld = 'mil';
    hostFixture.componentInstance.lang = 'es';
    hostFixture.detectChanges();

    const bannerComponent = hostFixture.debugElement.children[0].componentInstance as UswdsBanner;
    expect(bannerComponent.tld()).toBe('mil');
    expect(bannerComponent.lang()).toBe('es');
    expect(bannerComponent.headerText()).toBe(BANNER_CONTENT.es.mil.header);
    expect(bannerComponent.lockIconId()).toBe('banner-lock-dot-mil-spanish');
    expect(bannerComponent.lockWord()).toBe('candado');
    expect(bannerComponent.domainStrong()).toBe('.mil');
  });

  it('should use custom ariaLabel and accordionId via template binding', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.componentInstance.ariaLabel = 'Custom banner label';
    hostFixture.componentInstance.accordionId = 'my-banner-id';
    hostFixture.componentInstance.assetsPath = '/cdn/img';
    hostFixture.detectChanges();

    const bannerComponent = hostFixture.debugElement.children[0].componentInstance as UswdsBanner;
    expect(bannerComponent.computedAriaLabel()).toBe('Custom banner label');
    expect(bannerComponent.computedAccordionId()).toBe('my-banner-id');
    expect(bannerComponent.flagImagePath()).toBe('/cdn/img/us_flag_small.png');
  });

  it('should render expanded content with .mil Spanish via template binding', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.componentInstance.tld = 'mil';
    hostFixture.componentInstance.lang = 'es';
    hostFixture.detectChanges();

    const bannerComponent = hostFixture.debugElement.children[0].componentInstance as UswdsBanner;
    bannerComponent.isExpanded.set(true);
    hostFixture.detectChanges();

    const compiled = hostFixture.nativeElement;
    expect(compiled.textContent).toContain('.mil');
    expect(compiled.textContent).toContain('candado');
  });
});
