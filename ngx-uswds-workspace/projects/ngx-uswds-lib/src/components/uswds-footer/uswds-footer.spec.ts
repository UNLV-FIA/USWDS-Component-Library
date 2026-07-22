import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsFooter } from './uswds-footer';
import { FooterLinkColumn, FooterForm, FooterLink, FooterAgencyInfo } from './footer-types';
import { vi } from 'vitest';
vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // compatibility for older code
      removeListener: vi.fn(), // compatibility for older code
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const SAMPLE_LINK_COLUMNS: FooterLinkColumn[] = [
  {
    topic: 'Topic1',
    links: [
      { label: 'Link1', href: '/Link1' },
      { label: 'Link2', href: '/Link2' },
    ],
  },
  {
    topic: 'Topic2',
    links: [
      { label: 'Link3', href: '/Link3' },
      { label: 'Link4', href: '/Link4' },
    ],
  },
  {
    topic: 'Topic3',
    links: [
      { label: 'Link5', href: '/Link5' },
      { label: 'Link6', href: '/Link6' },
    ],
  },
  {
    topic: 'Topic4',
    links: [
      { label: 'Link7', href: '/Link7' },
      { label: 'Link8', href: '/Link8' },
      { label: 'Longer name of a link', href: '/Link9' },
    ],
  },
];

const SAMPLE_FORM: FooterForm = {
  heading: 'form heading',
  label: 'form label',
  buttonStyle: 'AccentWarm',
  buttonText: 'form button',
};

const SAMPLE_LINKS: FooterLink[] = [
  { label: 'Link1', href: '/Link1' },
  { label: 'Link2', href: '/Link2' },
  { label: 'Link3', href: '/Link3' },
  { label: 'Link4', href: '/Link4' },
];

const SAMPLE_AGENCY: FooterAgencyInfo = {
  name: 'agency name',
  logoImagePath: '/path',
  contactHeading: 'contact us',
  phone: '123-456-7899',
  email: 'info@agency.gov',
};

const SAMPLE_SOCIALS = {
  facebook: '/facebook',
  twitter: '/twitter',
  youtube: '/youtube',
  instagram: '/instagram',
  rss: '/rss',
};

describe('UswdsFooter', () => {
  let component: UswdsFooter;
  let fixture: ComponentFixture<UswdsFooter>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsFooter);
    component = fixture.componentInstance;
    el = fixture.nativeElement;

    // Provide required prop
    fixture.componentRef.setInput('variant', 'medium');
    fixture.detectChanges();

    await fixture.whenStable();
  });

  describe('Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have empty primary links', () => {
      expect(component.links()).toEqual([]);
    });

    it('should have empty secondary links', () => {
      expect(component.linkColumns()).toEqual([]);
    });

    it('should have a return to top link', () => {
      const parentDiv = el.querySelector('div.usa-footer__return-to-top');
      const a = parentDiv?.querySelector('a');
      expect(a?.getAttribute('href')).toBe('#');
    });

    describe('Computed properties', () => {
      it('should use default icons path', () => {
        expect(component.iconsPath()).toBe('/assets/img/usa-icons');
      });

      it('should generate correct facebook icon path', () => {
        expect(component.facebookIconPath()).toBe('/assets/img/usa-icons/facebook.svg');
      });

      it('should generate correct twitter icon path', () => {
        expect(component.twitterIconPath()).toBe('/assets/img/usa-icons/twitter.svg');
      });

      it('should generate correct youtube icon path', () => {
        expect(component.youtubeIconPath()).toBe('/assets/img/usa-icons/youtube.svg');
      });

      it('should generate correct instagram icon path', () => {
        expect(component.instagramIconPath()).toBe('/assets/img/usa-icons/instagram.svg');
      });

      it('should generate correct rss feed icon path', () => {
        expect(component.rssFeedIconPath()).toBe('/assets/img/usa-icons/rss_feed.svg');
      });
    });

    it('should throw an error for an invalid variant', () => {
      fixture.componentRef.setInput('variant', 'BADVARIANT');
      expect(() => {
        fixture.detectChanges();
      }).toThrowError('Invalid footer variant selected, valid variants are: [big, medium, slim]');
    });
  });

  describe('Big variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'big');
      fixture.detectChanges();
    });

    it('should have the base footer class', () => {
      const footer = el.querySelector('footer');
      expect(footer?.classList.contains('usa-footer')).toBeTruthy();
    });

    it('should have the big footer class', () => {
      const footer = el.querySelector('footer');
      expect(footer?.classList.contains('usa-footer--big')).toBeTruthy();
    });

    describe('Primary section', () => {
      it('should render a nav element', () => {
        const nav = el.querySelector('nav.usa-footer__nav');
        expect(nav).toBeTruthy();
      });

      it('should render nothing when links are empty', () => {
        fixture.componentRef.setInput('linkColumns', []);
        fixture.detectChanges();
        const parentNav = el.querySelector('nav.usa-footer__nav');
        const links = parentNav?.querySelectorAll('li.usa-footer__secondary-link');
        expect(links?.length).toBe(0);
      });

      describe('Link columns', () => {
        beforeEach(() => {
          fixture.componentRef.setInput('linkColumns', SAMPLE_LINK_COLUMNS);
          fixture.detectChanges();
        });

        it('should render the correct number of columns', () => {
          const cols = el.querySelectorAll('section.usa-footer__primary-content');
          expect(cols.length).toBe(4);
        });

        it('should render the correct number of link topics', () => {
          const topics = el.querySelectorAll('h4.usa-footer__primary-link');
          expect(topics.length).toBe(4);
        });

        it('should render the correct text of links` topics', () => {
          const topics = el.querySelectorAll('h4.usa-footer__primary-link');
          topics.forEach((topic, i) => {
            expect(topic.textContent).toBe(SAMPLE_LINK_COLUMNS[i].topic);
          });
        });

        it('should render the correct number of links for each column', () => {
          const cols = el.querySelectorAll('section.usa-footer__primary-content');
          cols.forEach((col, i) => {
            const links = col.querySelectorAll('li.usa-footer__secondary-link');
            expect(links.length).toBe(SAMPLE_LINK_COLUMNS[i].links.length);
          });
        });

        it('should render the correct label of links', () => {
          const cols = el.querySelectorAll('section.usa-footer__primary-content');
          cols.forEach((col, i) => {
            const listItems = col.querySelectorAll('li.usa-footer__secondary-link');
            listItems.forEach((item, j) => {
              const a = item.querySelector('a');
              expect(a?.textContent).toBe(SAMPLE_LINK_COLUMNS[i].links[j].label);
            });
          });
        });

        it('should render the correct href of links', () => {
          const cols = el.querySelectorAll('section.usa-footer__primary-content');
          cols.forEach((col, i) => {
            const listItems = col.querySelectorAll('li.usa-footer__secondary-link');
            listItems.forEach((item, j) => {
              const a = item.querySelector('a');
              expect(a?.getAttribute('href')).toBe(SAMPLE_LINK_COLUMNS[i].links[j].href);
            });
          });
        });
      });

      describe('Form', () => {
        it('should render the sign up div', () => {
          const div = el.querySelector('div.usa-sign-up');
          expect(div).toBeTruthy();
        });

        it('should render the form', () => {
          const form = el.querySelector('form.usa-form');
          expect(form).toBeTruthy();
        });

        describe('Custom values', () => {
          beforeEach(() => {
            fixture.componentRef.setInput('signUpForm', SAMPLE_FORM);
            fixture.detectChanges();
          });

          it('should render correct heading', () => {
            const div = el.querySelector('div.usa-sign-up');
            const heading = div?.querySelector('.usa-sign-up__heading');
            expect(heading?.textContent).toBe(SAMPLE_FORM.heading);
          });

          it('should render correct label', () => {
            const form = el.querySelector('form.usa-form');
            const label = form?.querySelector('label');
            expect(label?.textContent).toBe(SAMPLE_FORM.label);
          });

          it('should render correct button text', () => {
            const form = el.querySelector('form.usa-form');
            const button = form?.querySelector('button');
            expect(button?.textContent).toBe(SAMPLE_FORM.buttonText);
          });

          it('should use correct button style', () => {
            expect(component.signUpButtonStyle()).toBe(SAMPLE_FORM.buttonStyle);
          });
        });

        describe('Fallback values', () => {
          it('should render default heading', () => {
            const div = el.querySelector('div.usa-sign-up');
            const heading = div?.querySelector('.usa-sign-up__heading');
            expect(heading?.textContent).toBe('Sign up');
          });

          it('should render default label', () => {
            const form = el.querySelector('form.usa-form');
            const label = form?.querySelector('label');
            expect(label?.textContent).toBe('Your email address');
          });

          it('should render default button text', () => {
            const form = el.querySelector('form.usa-form');
            const button = form?.querySelector('button');
            expect(button?.textContent).toBe('Sign up');
          });

          it('should use default button style', () => {
            expect(component.signUpButtonStyle()).toBe('Default');
          });
        });
      });
    });
  });

  describe('Medium variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'medium');
      fixture.detectChanges();
    });

    it('should have only the base footer class', () => {
      const footer = el.querySelector('footer');
      expect(footer?.classList.contains('usa-footer')).toBeTruthy();
      expect(footer?.classList.length).toBe(1);
    });

    describe('Primary section', () => {
      it('should render a nav element', () => {
        const nav = el.querySelector('nav');
        expect(nav).toBeTruthy();
      });

      it('should render nothing when links are empty', () => {
        fixture.componentRef.setInput('links', []);
        fixture.detectChanges();
        const parentNav = el.querySelector('nav.usa-footer__nav');
        const links = parentNav?.querySelectorAll('li.usa-footer__primary-link');
        expect(links?.length).toBe(0);
      });

      describe('Links', () => {
        beforeEach(() => {
          fixture.componentRef.setInput('links', SAMPLE_LINKS);
          fixture.detectChanges();
        });

        it('should render the correct number of links', () => {
          const links = el.querySelectorAll('a.usa-footer__primary-link');
          expect(links.length).toBe(4);
        });

        it('should render the correct label of links', () => {
          const links = el.querySelectorAll('a.usa-footer__primary-link');
          links.forEach((link, i) => {
            expect(link?.textContent).toBe(SAMPLE_LINKS[i].label);
          });
        });

        it('should render the correct href of links', () => {
          const links = el.querySelectorAll('a.usa-footer__primary-link');
          links.forEach((link, i) => {
            expect(link?.getAttribute('href')).toBe(SAMPLE_LINKS[i].href);
          });
        });
      });
    });
  });

  describe('Big and medium variant`s secondary section', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'medium');
      fixture.detectChanges();
    });

    describe('Default DOM', () => {
      it('should not render agency name', () => {
        const name = el.querySelector('p.usa-footer__logo-heading');
        expect(name).toBeNull();
      });

      it('should not render agency logo', () => {
        const logo = el.querySelector('img.usa-footer__logo-img');
        expect(logo).toBeNull();
      });

      it('should not render contact heading', () => {
        const heading = el.querySelector('p.usa-footer__contact-heading');
        expect(heading).toBeNull();
      });

      it('should not render phone number', () => {
        const parentDiv = el.querySelector('div.usa-footer__contact-info');
        const a = parentDiv?.querySelector('a[href^="tel:"]');
        expect(a).toBeNull();
      });

      it('should not render email', () => {
        const parentDiv = el.querySelector('div.usa-footer__contact-info');
        const a = parentDiv?.querySelector('a[href^="mailto:"]');
        expect(a).toBeNull();
      });

      const socialsTestCases = [
        { social: 'Facebook', url: SAMPLE_SOCIALS.facebook },
        { social: 'Twitter', url: SAMPLE_SOCIALS.twitter },
        { social: 'YouTube', url: SAMPLE_SOCIALS.youtube },
        { social: 'Instagram', url: SAMPLE_SOCIALS.instagram },
        { social: 'RSS', url: SAMPLE_SOCIALS.rss },
      ];

      socialsTestCases.forEach((platform) => {
        it(`should not render ${platform.social}`, () => {
          const socialIcon = el.querySelector(
            `img.usa-social-link__icon[alt="${platform.social}"]`,
          );
          const parentLink = socialIcon?.parentElement;
          expect(socialIcon).toBeFalsy();
          expect(parentLink).toBeFalsy();
        });
      });

      describe('Agency informaton', () => {
        beforeEach(() => {
          fixture.componentRef.setInput('agencyInfo', SAMPLE_AGENCY);
          fixture.detectChanges();
        });

        it('should render agency name with the passed text', () => {
          const name = el.querySelector('p.usa-footer__logo-heading');
          expect(name).toBeTruthy();
          expect(name?.textContent).toBe(SAMPLE_AGENCY.name);
        });

        it('should render agency logo with correct href', () => {
          const logo = el.querySelector('img.usa-footer__logo-img');
          expect(logo).toBeTruthy();
          expect(logo?.getAttribute('src')).toBe(SAMPLE_AGENCY.logoImagePath);
        });

        it('should render contact heading with the passed text', () => {
          const heading = el.querySelector('p.usa-footer__contact-heading');
          expect(heading).toBeTruthy();
          expect(heading?.textContent).toBe(SAMPLE_AGENCY.contactHeading);
        });

        it('should render phone number with correct href', () => {
          const parentDiv = el.querySelector('div.usa-footer__contact-info');
          const a = parentDiv?.querySelector('a[href^="tel:"]');
          expect(a).toBeTruthy();
          expect(a?.getAttribute('href')).toBe(`tel:${SAMPLE_AGENCY.phone}`);
        });

        it('should use phone number as label by default', () => {
          const parentDiv = el.querySelector('div.usa-footer__contact-info');
          const a = parentDiv?.querySelector('a[href^="tel:"]');
          expect(a?.textContent).toBe(SAMPLE_AGENCY.phone);
        });

        it('should use phone number label as label when provided', () => {
          const SAMPLE_PHONE_LABEL: FooterAgencyInfo = {
            phone: '123-456-789',
            phoneLabel: '<(800) 555-GOVT>',
          };
          fixture.componentRef.setInput('agencyInfo', SAMPLE_PHONE_LABEL);
          fixture.detectChanges();
          const parentDiv = el.querySelector('div.usa-footer__contact-info');
          const a = parentDiv?.querySelector('a[href^="tel:"]');
          expect(a?.textContent).toBe('<(800) 555-GOVT>');
        });

        it('should render email with correct href', () => {
          const parentDiv = el.querySelector('div.usa-footer__contact-info');
          const a = parentDiv?.querySelector('a[href^="mailto:"]');
          expect(a).toBeTruthy();
          expect(a?.getAttribute('href')).toBe(`mailto:${SAMPLE_AGENCY.email}`);
        });

        describe('Social media links', () => {
          beforeEach(() => {
            fixture.componentRef.setInput('socials', SAMPLE_SOCIALS);
            fixture.detectChanges();
          });

          socialsTestCases.forEach((platform) => {
            it(`should render ${platform.social}'s icon`, () => {
              const socialIcon = el.querySelector(`img[alt="${platform.social}"]`);
              expect(socialIcon).toBeTruthy();
              expect(socialIcon?.classList.contains('usa-social-link__icon')).toBeTruthy();
            });

            it(`should render ${platform.social} link`, () => {
              const socialIcon = el.querySelector(
                `img.usa-social-link__icon[alt="${platform.social}"]`,
              );
              const parentLink = socialIcon?.parentElement;
              expect(parentLink).toBeTruthy();
              expect(parentLink?.classList.contains('usa-social-link')).toBeTruthy();
              expect(parentLink?.getAttribute('href')).toBe(platform.url);
            });
          });
        });
      });
    });
  });
});
