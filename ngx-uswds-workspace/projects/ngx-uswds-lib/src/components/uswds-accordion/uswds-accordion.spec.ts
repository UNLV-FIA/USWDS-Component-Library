import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UswdsAccordion } from './uswds-accordion';
import { AccordionItem } from './accordion-types';

describe('UswdsAccordion', () => {
  let component: UswdsAccordion;
  let fixture: ComponentFixture<UswdsAccordion>;

  function threeItems(): AccordionItem[] {
    return [
      { heading: 'First', content: '<p>Content 1</p>', expandedByDefault: true },
      { heading: 'Second', content: '<p>Content 2</p>' },
      { heading: 'Third', content: '<p>Content 3</p>' },
    ];
  }

  function getButton(index: number): HTMLButtonElement {
    return fixture.nativeElement.querySelectorAll('button.usa-accordion__button')[index];
  }

  function getPanel(index: number): HTMLElement {
    return fixture.nativeElement.querySelectorAll('.usa-accordion__content')[index];
  }

  function getContainer(): HTMLElement {
    return fixture.nativeElement.querySelector('[class*="usa-accordion"]');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UswdsAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(UswdsAccordion);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('items', threeItems());
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Default values', () => {
    it('should default variant to borderless', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();
      expect(component.variant()).toBe('borderless');
    });

    it('should default multiselectable to false', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();
      expect(component.multiselectable()).toBe(false);
    });

    it('should default items to an empty array', () => {
      fixture.detectChanges();
      expect(component.items()).toEqual([]);
    });
  });

  describe('Initial state', () => {
    it('should open the item marked expandedByDefault on init', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();

      expect(component.isExpanded(0)).toBe(true);
      expect(component.isExpanded(1)).toBe(false);
      expect(component.isExpanded(2)).toBe(false);
    });

    it('should open no items when none are marked expandedByDefault', () => {
      fixture.componentRef.setInput('items', [
        { heading: 'A', content: '<p>A</p>' },
        { heading: 'B', content: '<p>B</p>' },
      ]);
      fixture.detectChanges();

      expect(component.isExpanded(0)).toBe(false);
      expect(component.isExpanded(1)).toBe(false);
    });

    it('should open only the first expandedByDefault item in single-select mode', () => {
      fixture.componentRef.setInput('items', [
        { heading: 'A', content: '<p>A</p>', expandedByDefault: true },
        { heading: 'B', content: '<p>B</p>', expandedByDefault: true },
        { heading: 'C', content: '<p>C</p>' },
      ]);
      fixture.componentRef.setInput('multiselectable', false);
      fixture.detectChanges();

      expect(component.isExpanded(0)).toBe(true);
      expect(component.isExpanded(1)).toBe(false);
    });

    it('should open ALL expandedByDefault items in multiselectable mode', () => {
      fixture.componentRef.setInput('items', [
        { heading: 'A', content: '<p>A</p>', expandedByDefault: true },
        { heading: 'B', content: '<p>B</p>', expandedByDefault: true },
        { heading: 'C', content: '<p>C</p>' },
      ]);
      fixture.componentRef.setInput('multiselectable', true);
      fixture.detectChanges();

      expect(component.isExpanded(0)).toBe(true);
      expect(component.isExpanded(1)).toBe(true);
      expect(component.isExpanded(2)).toBe(false);
    });
  });

  describe('Single-select behavior', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();
    });

    it('should open a closed panel and close others', () => {
      component.togglePanel(1);
      expect(component.isExpanded(0)).toBe(false);
      expect(component.isExpanded(1)).toBe(true);
    });

    it('should close the currently open panel when clicked again', () => {
      component.togglePanel(0);
      expect(component.isExpanded(0)).toBe(false);
      expect(component.expandedIndices().size).toBe(0);
    });
  });

  describe('Multiselectable behavior', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.componentRef.setInput('multiselectable', true);
      fixture.detectChanges();
    });

    it('should toggle panels independently', () => {
      component.togglePanel(2);
      expect(component.isExpanded(0)).toBe(true);
      expect(component.isExpanded(2)).toBe(true);
    });

    it('should close only the clicked panel when toggled', () => {
      component.togglePanel(2);
      component.togglePanel(0);

      expect(component.isExpanded(0)).toBe(false);
      expect(component.isExpanded(2)).toBe(true);
    });

    it('should allow all panels to be open at once', () => {
      component.togglePanel(1);
      component.togglePanel(2);

      expect(component.isExpanded(0)).toBe(true);
      expect(component.isExpanded(1)).toBe(true);
      expect(component.isExpanded(2)).toBe(true);
    });
  });

  describe('CSS classes and styling', () => {
    it('should apply correct classes based on variant and multiselectable', () => {
      fixture.componentRef.setInput('items', threeItems());

      // Borderless variant
      fixture.componentRef.setInput('variant', 'borderless');
      fixture.detectChanges();
      expect(component.containerClasses()).toEqual(['usa-accordion']);

      // Bordered variant
      fixture.componentRef.setInput('variant', 'bordered');
      fixture.detectChanges();
      expect(component.containerClasses()).toContain('usa-accordion--bordered');

      // Multiselectable
      fixture.componentRef.setInput('multiselectable', true);
      fixture.detectChanges();
      const classes = component.containerClasses();
      expect(classes).toContain('usa-accordion');
      expect(classes).toContain('usa-accordion--bordered');
      expect(classes).toContain('usa-accordion--multiselectable');
    });

    it('should set data-allow-multiple attribute when multiselectable', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.componentRef.setInput('multiselectable', false);
      fixture.detectChanges();
      expect(getContainer().hasAttribute('data-allow-multiple')).toBe(false);

      fixture.componentRef.setInput('multiselectable', true);
      fixture.detectChanges();
      expect(getContainer().hasAttribute('data-allow-multiple')).toBe(true);
    });
  });

  describe('ID generation', () => {
    it('should use provided idPrefix for all IDs', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.componentRef.setInput('idPrefix', 'my-accordion');
      fixture.detectChanges();

      expect(component.contentId(0)).toBe('my-accordion-1');
      expect(component.contentId(1)).toBe('my-accordion-2');
      expect(component.buttonId(0)).toBe('my-accordion-btn-1');
      expect(component.buttonId(1)).toBe('my-accordion-btn-2');
    });

    it('should generate unique IDs when idPrefix is not provided', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();
      const prefix1 = component.resolvedIdPrefix();

      const fixture2 = TestBed.createComponent(UswdsAccordion);
      fixture2.componentRef.setInput('items', threeItems());
      fixture2.detectChanges();
      const prefix2 = fixture2.componentInstance.resolvedIdPrefix();

      expect(prefix1).toMatch(/^accordion-\d+$/);
      expect(prefix2).toMatch(/^accordion-\d+$/);
      expect(prefix1).not.toBe(prefix2);
    });
  });

  describe('DOM rendering', () => {
    it('should render correct number of buttons and panels with heading text', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button.usa-accordion__button');
      const panels = fixture.nativeElement.querySelectorAll('.usa-accordion__content');

      expect(buttons.length).toBe(3);
      expect(panels.length).toBe(3);
      expect(getButton(0).textContent!.trim()).toBe('First');
      expect(getButton(1).textContent!.trim()).toBe('Second');
      expect(getButton(2).textContent!.trim()).toBe('Third');
    });

    it('should render panel content via innerHTML', () => {
      fixture.componentRef.setInput('items', [
        { heading: 'Rich', content: '<p>Hello</p><ul><li>Item</li></ul>' },
      ]);
      fixture.detectChanges();

      const panel = getPanel(0);
      expect(panel.querySelector('p')!.textContent).toBe('Hello');
      expect(panel.querySelector('li')!.textContent).toBe('Item');
    });

    it('should hide closed panels via the hidden attribute', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();

      expect(getPanel(0).hasAttribute('hidden')).toBe(false);
      expect(getPanel(1).hasAttribute('hidden')).toBe(true);
      expect(getPanel(2).hasAttribute('hidden')).toBe(true);

      component.togglePanel(2);
      fixture.detectChanges();
      expect(getPanel(2).hasAttribute('hidden')).toBe(false);
    });

    it('should set all buttons to type="button"', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button');
      buttons.forEach((btn: HTMLButtonElement) => {
        expect(btn.getAttribute('type')).toBe('button');
      });
    });

    it('should render nothing when items array is empty', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button.usa-accordion__button');
      expect(buttons.length).toBe(0);
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA attributes linking buttons and panels', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.componentRef.setInput('idPrefix', 'acc');
      fixture.detectChanges();

      // Button attributes
      expect(getButton(0).getAttribute('id')).toBe('acc-btn-1');
      expect(getButton(0).getAttribute('aria-controls')).toBe('acc-1');
      expect(getButton(0).getAttribute('aria-expanded')).toBe('true');
      expect(getButton(1).getAttribute('aria-expanded')).toBe('false');

      // Panel attributes
      expect(getPanel(0).getAttribute('id')).toBe('acc-1');
      expect(getPanel(0).getAttribute('role')).toBe('region');
      expect(getPanel(0).getAttribute('aria-labelledby')).toBe('acc-btn-1');
      expect(getPanel(1).getAttribute('aria-labelledby')).toBe('acc-btn-2');
    });

    it('should update aria-expanded when a panel is toggled', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();

      component.togglePanel(1);
      fixture.detectChanges();

      expect(getButton(0).getAttribute('aria-expanded')).toBe('false');
      expect(getButton(1).getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('DOM click interaction', () => {
    it('should toggle panel when button is clicked in the DOM', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();

      expect(component.isExpanded(1)).toBe(false);

      getButton(1).click();
      fixture.detectChanges();

      expect(component.isExpanded(1)).toBe(true);
      expect(getButton(1).getAttribute('aria-expanded')).toBe('true');
    });

    it('should close an open panel when its button is clicked again', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.detectChanges();

      expect(component.isExpanded(0)).toBe(true);

      getButton(0).click();
      fixture.detectChanges();

      expect(component.isExpanded(0)).toBe(false);
      expect(getButton(0).getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('CSS classes and styling', () => {
    it('should apply only multiselectable class when borderless and multiselectable', () => {
      fixture.componentRef.setInput('items', threeItems());
      fixture.componentRef.setInput('variant', 'borderless');
      fixture.componentRef.setInput('multiselectable', true);
      fixture.detectChanges();

      const classes = component.containerClasses();
      expect(classes).toContain('usa-accordion');
      expect(classes).toContain('usa-accordion--multiselectable');
      expect(classes).not.toContain('usa-accordion--bordered');
    });
  });

  describe('Edge cases', () => {
    it('should handle a single item gracefully', () => {
      fixture.componentRef.setInput('items', [
        { heading: 'Solo', content: '<p>Alone</p>', expandedByDefault: true },
      ]);
      fixture.detectChanges();

      expect(component.isExpanded(0)).toBe(true);
      component.togglePanel(0);
      expect(component.isExpanded(0)).toBe(false);
    });
  });
});
