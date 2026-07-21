import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsFooter } from './uswds-footer';
import { FooterLinkColumn } from './footer-types';
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

    it('should have a return to top link', () => {
      const parentDiv = el.querySelector('div.usa-footer__return-to-top');
      const a = parentDiv?.querySelector('a');
      expect(a?.getAttribute('href')).toBe('#');
    });

    describe('Primary section', () => {
      it('should render nothing when links are empty', () => {
        fixture.componentRef.setInput('linkColumns', []);
        fixture.detectChanges();
        const parentNav = el.querySelector('nav.usa-footer__nav');
        const links = parentNav?.querySelectorAll('li');
        expect(links?.length).toBe(0);
      });

      it('should render a nav element', () => {
        const nav = el.querySelector('nav.usa-footer__nav');
        expect(nav).toBeTruthy();
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
    });
  });
});
