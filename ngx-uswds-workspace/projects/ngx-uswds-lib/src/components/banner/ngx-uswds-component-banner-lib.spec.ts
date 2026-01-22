import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './ngx-uswds-component-banner-lib';
import { BANNER_CONTENT } from './banner-content';

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

    describe('Text content for different configurations', () => {
        const testCases = [
            {
                tld: 'gov' as const,
                lang: 'en' as const,
                description: '.gov domain - English'
            },
            {
                tld: 'mil' as const,
                lang: 'en' as const,
                description: '.mil domain - English'
            },
            {
                tld: 'gov' as const,
                lang: 'es' as const,
                description: '.gov domain - Spanish'
            },
            {
                tld: 'mil' as const,
                lang: 'es' as const,
                description: '.mil domain - Spanish'
            }
        ];

        testCases.forEach(({ tld, lang, description }) => {
            describe(description, () => {
                beforeEach(() => {
                    component.tld = tld;
                    component.lang = lang;
                });

                it('should display correct header text', () => {
                    expect(component.headerText).toBe(BANNER_CONTENT[lang][tld].header);
                });

                it('should display correct button text', () => {
                    expect(component.buttonText).toBe(BANNER_CONTENT[lang][tld].button);
                });

                it('should display correct domain label', () => {
                    expect(component.domainLabel).toBe(BANNER_CONTENT[lang][tld].domainLabel);
                });

                it('should display correct domain description', () => {
                    expect(component.domainDescription).toBe(BANNER_CONTENT[lang][tld].domainDescription);
                });

                it('should display correct secure label', () => {
                    expect(component.secureLabel).toBe(BANNER_CONTENT[lang][tld].secureLabel);
                });

                it('should display correct secure description', () => {
                    expect(component.secureDescription).toBe(BANNER_CONTENT[lang][tld].secureDescription);
                });
            });
        });
    });

    describe('Computed properties', () => {
        it('should use custom aria-label if provided', () => {
            component.ariaLabel = 'Custom label';
            expect(component.computedAriaLabel).toBe('Custom label');
        });

        it('should use default English aria-label', () => {
            component.lang = 'en';
            expect(component.computedAriaLabel).toBe(BANNER_CONTENT.en[component.tld].header);
        });

        it('should use default Spanish aria-label', () => {
            component.lang = 'es';
            expect(component.computedAriaLabel).toBe(BANNER_CONTENT.es[component.tld].header);
        });

        const accordionIdTestCases = [
            { tld: 'gov' as const, lang: 'en' as const, expected: 'gov-banner' },
            { tld: 'mil' as const, lang: 'en' as const, expected: 'gov-banner-dot-mil' },
            { tld: 'gov' as const, lang: 'es' as const, expected: 'gov-banner-lang-es' },
            { tld: 'mil' as const, lang: 'es' as const, expected: 'gov-banner-dot-mil-lang-es' }
        ];

        accordionIdTestCases.forEach(({ tld, lang, expected }) => {
            it(`should generate correct accordion ID for .${tld} ${lang === 'en' ? 'English' : 'Spanish'}`, () => {
                component.tld = tld;
                component.lang = lang;
                expect(component.computedAccordionId).toBe(expected);
            });
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