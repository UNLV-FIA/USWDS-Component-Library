import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsBreadcrumb, BreadcrumbItem } from './uswds-breadcrumb';

const SAMPLE_ITEMS: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Federal Contracting', href: '/contracting' },
  { label: 'Contracting assistance programs', href: '/contracting/assistance' },
  { label: 'Economically disadvantaged women-owned small business federal contracting program' },
];

describe('UswdsBreadcrumb', () => {
  let component: UswdsBreadcrumb;
  let fixture: ComponentFixture<UswdsBreadcrumb>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsBreadcrumb],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsBreadcrumb);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
  });

  // Creation
  describe('creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default variant of "default"', () => {
      expect(component.variant).toBe('default');
    });

    it('should have rdfa false by default', () => {
      expect(component.rdfa).toBe(false);
    });

    it('should have empty items by default', () => {
      expect(component.items).toEqual([]);
    });
  });

  // containerClasses
  describe('containerClasses', () => {
    it('should include usa-breadcrumb for default variant', () => {
      component.variant = 'default';
      expect(component.containerClasses).toContain('usa-breadcrumb');
      expect(component.containerClasses).not.toContain('usa-breadcrumb--wrap');
    });

    it('should include usa-breadcrumb--wrap for wrap variant', () => {
      component.variant = 'wrap';
      expect(component.containerClasses).toContain('usa-breadcrumb');
      expect(component.containerClasses).toContain('usa-breadcrumb--wrap');
    });
  });

  // leadingItems/currentItem
  describe('leadingItems and currentItem', () => {
    it('should return all but last item as leadingItems', () => {
      component.items = SAMPLE_ITEMS;
      expect(component.leadingItems.length).toBe(3);
      expect(component.leadingItems[0].label).toBe('Home');
    });

    it('should return the last item as currentItem', () => {
      component.items = SAMPLE_ITEMS;
      expect(component.currentItem?.label).toBe(
        'Economically disadvantaged women-owned small business federal contracting program',
      );
    });

    it('should return null for currentItem when items is empty', () => {
      component.items = [];
      expect(component.currentItem).toBeNull();
    });

    it('should return empty array for leadingItems when items has one entry', () => {
      component.items = [{ label: 'Home', href: '/' }];
      expect(component.leadingItems.length).toBe(0);
    });
  });

  // DOM: Default variant
  describe('DOM rendering (default)', () => {
    beforeEach(() => {
      component.items = SAMPLE_ITEMS;
      fixture.detectChanges();
    });

    it('should render a nav element', () => {
      expect(el.querySelector('nav')).toBeTruthy();
    });

    it('should render an ordered list', () => {
      expect(el.querySelector('ol.usa-breadcrumb__list')).toBeTruthy();
    });

    it('should render correct number of list items', () => {
      const items = el.querySelectorAll('li.usa-breadcrumb__list-item');
      expect(items.length).toBe(4);
    });

    it('should render links for all but the last item', () => {
      const links = el.querySelectorAll('a.usa-breadcrumb__link');
      expect(links.length).toBe(3);
    });

    it('should render the current item without a link', () => {
      const current = el.querySelector('li.usa-current');
      expect(current).toBeTruthy();
      expect(current?.querySelector('a')).toBeFalsy();
    });

    it('should not include meta[property="position"] in default mode', () => {
      expect(el.querySelectorAll('meta[property="position"]').length).toBe(0);
    });
  });

  // Accessibility: Default
  describe('accessibility (default)', () => {
    beforeEach(() => {
      component.items = SAMPLE_ITEMS;
      fixture.detectChanges();
    });

    it('nav should have aria-label="Breadcrumbs"', () => {
      const nav = el.querySelector('nav');
      expect(nav?.getAttribute('aria-label')).toBe('Breadcrumbs');
    });

    it('current item should have aria-current="page"', () => {
      const current = el.querySelector('li.usa-current');
      expect(current?.getAttribute('aria-current')).toBe('page');
    });

    it('non-current items should not have aria-current', () => {
      const nonCurrent = el.querySelectorAll('li.usa-breadcrumb__list-item:not(.usa-current)');
      nonCurrent.forEach((item) => {
        expect(item.getAttribute('aria-current')).toBeNull();
      });
    });
  });

  // DOM: Wrap variant
  describe('DOM rendering (wrap variant)', () => {
    beforeEach(() => {
      component.items = SAMPLE_ITEMS;
      component.variant = 'wrap';
      fixture.detectChanges();
    });

    it('should apply usa-breadcrumb--wrap class', () => {
      const nav = el.querySelector('nav');
      expect(nav?.classList.contains('usa-breadcrumb--wrap')).toBe(true);
    });
  });

  // DOM: RDFa variant
  describe('DOM rendering (rdfa)', () => {
    beforeEach(() => {
      component.items = SAMPLE_ITEMS;
      component.rdfa = true;
      fixture.detectChanges();
    });

    it('should render ol with vocab and typeof attributes', () => {
      const ol = el.querySelector('ol');
      expect(ol?.getAttribute('vocab')).toBe('http://schema.org/');
      expect(ol?.getAttribute('typeof')).toBe('BreadcrumbList');
    });

    it('should render meta[property="position"] for each item', () => {
      const metas = el.querySelectorAll('meta[property="position"]');
      expect(metas.length).toBe(4);
    });

    it('should have correct position content values', () => {
      const metas = el.querySelectorAll('meta[property="position"]');
      metas.forEach((meta, i) => {
        expect(meta.getAttribute('content')).toBe(String(i + 1));
      });
    });

    it('leading items should have property="item" on anchor', () => {
      const links = el.querySelectorAll('a[property="item"]');
      expect(links.length).toBe(3);
    });

    it('current item should have property="name" on span', () => {
      const current = el.querySelector('li.usa-current span[property="name"]');
      expect(current).toBeTruthy();
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('should render nothing when items is empty', () => {
      component.items = [];
      fixture.detectChanges();
      const listItems = el.querySelectorAll('li');
      expect(listItems.length).toBe(0);
    });

    it('should handle a single item (only current, no links)', () => {
      component.items = [{ label: 'Home' }];
      fixture.detectChanges();
      expect(el.querySelectorAll('a').length).toBe(0);
      expect(el.querySelector('li.usa-current')).toBeTruthy();
    });
  });
});
