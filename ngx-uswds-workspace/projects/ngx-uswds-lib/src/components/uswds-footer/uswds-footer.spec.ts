import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsFooter } from './uswds-footer';
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

// const SAMPLE_LINK_COLUMNS: FooterLinkColumn[] = [

// ];

describe('UswdsFooter', () => {
  let component: UswdsFooter;
  let fixture: ComponentFixture<UswdsFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsFooter);
    component = fixture.componentInstance;

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
  });

  it('should have a return to top link', () => {
    const returnDiv: HTMLElement = fixture.nativeElement.querySelector(
      'div.usa-footer__return-to-top',
    );
    const a: HTMLElement | null = returnDiv?.querySelector('a');
    expect(a?.getAttribute('href')).toBe('#');
  });

  it('should have the footer class', () => {
    const el: HTMLElement = fixture.nativeElement.querySelector('footer');
    expect(el?.classList.contains('usa-footer')).toBeTruthy();
  });
});
